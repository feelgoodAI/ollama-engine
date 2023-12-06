import { closeMainWindow } from "@raycast/api";

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

export const getModelsFromOllamaLibrary = (directoryPath: string) => {
  return fs.readdirSync(directoryPath).map((file: string) => {
    return path.join(directoryPath, file);
  });
}

export const runModel = (model: string) => {
  exec(`killall ollama`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`run error: ${error}`);
    }
    
    console.log('Killing all ollama processes...');

    exec(`ollama run ${model}`, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`run error: ${error}`);
        return;
      }
    });
  });

  closeMainWindow();
}