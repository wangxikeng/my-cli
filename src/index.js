#!/usr/bin/env node
import { program } from 'commander'
import fs from 'node:fs'
import inquirer from 'inquirer'
import { checkPath, downloadTemplate } from './utils.js'
let json = fs.readFileSync('./package.json', 'utf-8')
json = JSON.parse(json)
program.version(json.version) //创建版本号

// 创建一个命令
program.command('create <name>').description('创建项目').action((name) => {
    if(checkPath(name)){
        console.log('项目已存在');
        return
    }
    // 与命令行交互
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名称',
            default: name
        },
        {
            type: 'confirm',
            name: 'isTs',
            message: '是否支持typeScript',
        },
    ]).then((res) => {
        if (res.isTs) {
            downloadTemplate('ts', res.name)
        }
        else {
            downloadTemplate('js', res.name)
        }
    })
})








program.parse(process.argv)