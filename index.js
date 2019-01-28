#!/usr/bin/env node

const fs = require("fs"),
    program = require("commander"),
    minify = require('minify'),
    { prompt } = require("inquirer"),
    { oldPaystack, oldPaystackEmbed, oldPaystackInline } = require("./model/oldPaystack"),
    { setupQuestion, confirm} = require("./model/questions");

let newPaystack = (old = String, recent = String, type, min)=>{
    if(type == "paystack-js"){
        fs.writeFile(`${recent}.js`, old, 'utf8', err => {
            if (err) return console.log(err);
        });

        console.info("Done!!!")
        console.info('Please check directory for "paystack.js"')    
        
        if(min == "min"){
            minify(`${recent}.js`)
            .then((data)=>{
                fs.writeFile(`${recent}.min.js`, data, 'utf8', err => {
                    if (err) return console.log(err);
                    else console.info(`"${recent}.min.js" also added as minified version`)
                });
            })
            .catch(console.error);
        }
        else if(min == undefined) return
        else console.log(`${min} is not a correct argument`)
    }else if(type == "inline" || type == "embed"){
        prompt(setupQuestion).then(answers => {
            console.info(answers)
            prompt(confirm).then((answer)=>{
                if(answer.correct){

                    let result = old.replace(/the-public-key/g, answers.public_key);
                    
                        
                    fs.writeFile(`${recent}.js`, result, 'utf8', err => {
                        if (err) return console.log(err);
                    });
                    
                    console.info("Done!!!")
                    console.info(`Done. Please check directory for "${recent}.js"`)

                    if(min == "min"){
                        minify(`${recent}.js`)
                        .then((data)=>{
                            fs.writeFile(`${recent}.min.js`, data, 'utf8', err => {
                                if (err) return console.log(err);
                                else console.info(`"${recent}.min.js" also added as minified version`)
                            });
                        })
                        .catch(console.error);
                    }
                    else if(min == undefined) return
                    else console.log(`${min} is not a correct argument`)

                }else{
                    console.error("You can try again")
                }
            }).catch(error=>console.log(error))   
        })
        .catch(error=>console.log(error))
    }
}

program
  .version('1.2.0')
  .description('A  simple CLI tool that makes paystack easier for developers to intergrate');

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