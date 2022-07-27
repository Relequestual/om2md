#! /usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs/promises';
import { existsSync } from 'fs';

const program = new Command();

const log = console.log;

const newline = '\n';

log(chalk.green('starting...'));

async function readFile(fileName) {
  try {
    const data = await fs.readFile(fileName, { encoding: 'utf8' });
    const members = JSON.parse(data);
    return members;
  } catch (err) {
    log(chalk.red(err));
  }
}

function createMarkdown(members, birthtime) {
  var output = '';
  output += '# These are the organizations members';
  output += newline + newline;

  output += '| Name | Account | Role |' + newline;

  output += members.filter((member => member.is_public))
    .sort(memberSort)
    .reduce((acc, member) =>
      acc += `| ${member.name} | @${member.login} | ${member.role} |` + newline
    , '');
  output += newline;

  output += `Members list generated on ${birthtime}`;

  return output;
}

function memberSort(a,b) {
  return ownerSort(a,b) || nameSort(a,b);
}

function nameSort(a,b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA > nameB) {
    return 1;
  }
  if (nameA < nameB) {
    return -1;
  }
  // names must be equal
  return 0;
}

function ownerSort(a,b) {
  if(a.role == 'Owner' && b.role == 'Owner') {
    return 0;
  }
  if (a.role == 'Owner') {
    return -1;
  }
  if (b.role == 'Owner') {
    return 1;
  }
  return 0;
}

const readFileBirthtime = async (fileName) => fs.stat(fileName)
  .then(({birthtime}) =>
    Promise.resolve(birthtime));

async function checkOrMakeFolder(){
  try {
    if(!existsSync('output')) {
      await fs.mkdir('output');
    }
  } catch (err) {
    log(chalk.red(err));
  }
}

async function writeFile (content) {
  try {
    await fs.writeFile('output/org-members.md', content);
  }catch (err){
    log(chalk.red(err));
  }
}

program
  .name('om2md')
  .argument('<file>', 'File containing JSON export of GitHub org members')
  .action(async (filePath) => {
    log(chalk.blue(`Processing ${filePath}`));
    const members = await readFile(filePath);
    const birthtime = await readFileBirthtime(filePath);
    const markdown = createMarkdown(members, birthtime);
    await checkOrMakeFolder(writeFile);
    await writeFile(markdown);
  });

await program.parseAsync();