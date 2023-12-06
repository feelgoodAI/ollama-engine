import { ActionPanel, List, Action } from "@raycast/api";
import { PATH_TO_MODELS } from "./constants";
import { getModelsFromOllamaLibrary, runModel } from "./ollama";

export default function Command() {
  const directoryPath = PATH_TO_MODELS;

  const files = getModelsFromOllamaLibrary(directoryPath);
  const models: string[] = [];

  files.forEach((file: string) => {
    const model = file.split('/').slice(-1)[0].split('.')[0];
    // Deleted files are still in the directory, so we need to filter them out
    if (model.length > 0) {
      models.push(model);
    }
  });

  return (
    <List>
      {models.map((model: string) => (
        <List.Item 
          key={model}
          icon="ollama-icon.png"
          title={model}
          actions={
            <ActionPanel>
              <Action title="Run model" onAction={() => runModel(model)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
