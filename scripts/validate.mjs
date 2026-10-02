import {execFileSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
import {join} from 'node:path';

const roots=['assets/js'];
const files=[];
for(const root of roots){
  for(const file of readdirSync(root,{withFileTypes:true})){
    if(file.isFile()&&file.name.endsWith('.js')) files.push(join(root,file.name));
  }
}
for(const file of files) execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
console.log('Validated '+files.length+' JavaScript modules.');
