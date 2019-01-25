#!/usr/bin/env node

const fs = require("fs"),
    program = require("commander"),
    minify = require('minify'),
    { prompt } = require("inquirer"),
    { oldPaystack, oldPaystackEmbed, oldPaystackInline } = require("./model/oldPaystack"),
    { setupQuestion, confirm} = require("./model/questions");

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
        prompt(setupQuestion).then(answers => {
            console.info(answers)
            prompt(confirm).then((answer)=>{
                if(answer.correct == true){
    
                    let result = oldPaystackInline.replace(/the-public-key/g, answers.public_key);
                    
                        
                    fs.writeFile("./paystack-inline.js", result, 'utf8', err => {
                        if (err) return console.log(err);
                    });
                    
                    console.info("Done!!!")
                    console.info('Done. Please check directory for "paystack-inline.js"')

                    if(min){
                        minify('./paystack-inline.js')
                        .then((data)=>{
                            fs.writeFile("./paystack-inline.min.js", data, 'utf8', err => {
                                if (err) return console.log(err);
                                else console.info('"paystack-inline.min.js" also added as minified version')
                            });
                        })
                        .catch(console.error);
                    }

                }else{
                    console.error("You can try again")
                }
            }).catch((error)=>{
                throw error
            })   
        })
        .catch(()=>{
            throw error
        })
    }else if(type == "embed"){
        prompt(setupQuestion).then(answers => {
            console.info(answers)
            prompt(confirm).then((answer)=>{
                if(answer.correct == true){
    
                    let result = oldPaystackEmbed.replace(/the-public-key/g, answers.public_key);
                        
                    fs.writeFile("./paystack-embed.js", result, 'utf8', err => {
                        if (err) return console.log(err);
                    });

                    console.info("Done!!!")
                    console.info('Please check directory for "paystack-embed.js"')

                    if(min){
                        minify('./paystack-embed.js')
                        .then((data)=>{
                            fs.writeFile("./paystack-embed.min.js", data, 'utf8', err => {
                                if (err) return console.log(err);
                                else console.info('"paystack-embed.min.js" also added as minified version')
                            });
                        })
                        .catch(console.error);
                    }
                    
                }else{
                    console.error("You can try again")
                }
            }).catch((error)=>{
                throw error
            })   
        })
        .catch(()=>{
            throw error
        })    
    }else if(type == "paystack-js"){

        fs.writeFile("./paystack.js", oldPaystack, 'utf8', err => {
            if (err) return console.log(err);
        });

        console.info("Done!!!")
        console.info('Please check directory for "paystack.js"')    
        
        if(min){
            minify('./paystack.js')
            .then((data)=>{
                fs.writeFile("./paystack.min.js", data, 'utf8', err => {
                    if (err) return console.log(err);
                    else console.info('"paystack.min.js" also added as minified version')
                });
            })
            .catch(console.error);
        }

    }else if(type){
        console.log(`${type} not a correct argument` )
    }
});

program.parse(process.argv);