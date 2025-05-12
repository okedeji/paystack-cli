#!/usr/bin/env node

const fs = require("fs"),
    program = require("commander"),
    minify = require('minify'),
    { prompt } = require("inquirer"),
    { oldPaystack, oldPaystackEmbed, oldPaystackInline } = require("./model/oldPaystack"),
    { setupQuestion, confirm} = require("./model/questions");

const writeFile = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, 'utf8', err => {
            if (err) {
                console.error(`Error writing file ${path}:`, err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const minifyAndSave = async (filePath) => {
    try {
        const minified = await minify(filePath);
        const minPath = filePath.replace('.js', '.min.js');
        await writeFile(minPath, minified);
        console.info(`"${minPath}" added as minified version`);
    } catch (err) {
        console.error('Error during minification:', err);
        throw err;
    }
};

let newPaystack = async (old = String, recent = String, type, min) => {
    try {
        const filePath = `${recent}.js`;

        if (type === "paystack-js") {
            await writeFile(filePath, old);
            console.info("Done!");
            console.info(`Please check directory for "${filePath}"`);

            if (min === "min") {
                await minifyAndSave(filePath);
            } else if (min !== undefined) {
                console.error(`"${min}" is not a correct argument`);
            }
        } else if (type === "inline" || type === "embed") {
            try {
                const answers = await prompt(setupQuestion);
                const confirmation = await prompt(confirm);

                if (confirmation.correct) {
                    const result = old.replace(/the-public-key/g, answers.public_key);
                    await writeFile(filePath, result);
                    console.info("Done!");
                    console.info(`Please check directory for "${filePath}"`);

                    if (min === "min") {
                        await minifyAndSave(filePath);
                    } else if (min !== undefined) {
                        console.error(`"${min}" is not a correct argument`);
                    }
                } else {
                    console.error("You can try again");
                }
            } catch (err) {
                console.error("Error during prompt:", err);
                throw err;
            }
        }
    } catch (err) {
        console.error("Operation failed:", err);
        throw err;
    }
}

program
  .version('1.2.3')
  .description('A simple CLI tool that makes paystack easier for developers to integrate');

program
  .command('create <type> [min]')
  .alias('c')
  .description(`
  Create "paystack.js", "paystack-inline.js" or "paystack-embed.js" file in the directory 
  It accepts one compulsory argument and one optional argument
  The compulsory argumment could be "inline", "embed" or "paystack-js"
  The optional argument is "min" which is used to add a minified output file if requested
  Public Key will be requested after command have been executed.`)
  .action((type, min) => {
    if(type == "inline"){
        newPaystack(oldPaystackInline, "./paystack-inline", type, min)
    }else if(type == "embed"){
        newPaystack(oldPaystackEmbed, "./paystack-embed", type, min)
    }else if(type == "paystack-js"){
        newPaystack(oldPaystack, "./paystack", type, min)
    }else if(type){
        console.log(`${type} not a correct argument` )
    }
});

program.parse(process.argv);