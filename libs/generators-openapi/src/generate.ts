import { createConfiguration, UserConfiguration } from './configuration';
import { loadDocuments } from './fs/read';
import { createDocumentNode } from './tree/document';

export async function generate(userConfiguration: UserConfiguration) {
  const configuration = createConfiguration(userConfiguration);
  const rawDocuments = await loadDocuments(configuration);
  const documentsNodes = rawDocuments.map(doc => createDocumentNode(doc.content, configuration));

  console.log(documentsNodes);
}
