#!/usr/bin/env node

const fs = require("fs"),
    program = require("commander"),
    { prompt } = require("inquirer"),
    { oldPaystack, oldPaystackEmbed, oldPaystackInline } = require("./model/oldPaystack"),
    { setupQuestion, confirm} = require("./model/questions");

program
  .version('1.0.0')
  .description('A  simple CLI tool that makes paystack easier for developers to intergrate');

program
  .command('create <type>')
  .alias('c')
  .description('Create "paystack.js", "paystack-inline.js" or "paystack-embed.js" file in the directory after the public key had been inputed')
  .action((type) => {
    if(type == "inline"){
        prompt(setupQuestion).then(answers => {
            console.info(answers)
            prompt(confirm).then((answer)=>{
                if(answer.correct == true){
    
                    let result = oldPaystackInline.replace(/the-public-key/g, answers.public_key);
                        
                    fs.writeFile("./paystack-inline.js", result, 'utf8', err => {
                        if (err) return console.log(err);
                    });

                    console.info('Done. Please check directory for "paystack-inline.js"')
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

                    console.info('Done. Please check directory for "paystack-embed.js"')
                    
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

        console.info('Done. Please check directory for "paystack.js"')                         
    }else if(type){
        console.log(`${type} not a correct argument` )
    }
});

program.parse(process.argv);