import nunjucks from 'nunjucks';

import setAttribute from './filters/set-attribute.js';
import setAttributes from './filters/set-attributes.js';
import generateExampleParams from './helpers/generate-example-params.js';
import navigationHelper from './helpers/navigation-helper.js';
import subNavigationHelper from './helpers/sub-navigation-helper.js';

export default function createNunjucksEnvironment(loader) {
  const templatePaths = ['src', 'src/views'];
  const nunjucksLoader = loader ?? new nunjucks.FileSystemLoader(templatePaths, { noCache: true });

  const nunjucksEnvironment = new nunjucks.Environment(nunjucksLoader);

  nunjucksEnvironment.addFilter('setAttribute', setAttribute);
  nunjucksEnvironment.addFilter('setAttributes', setAttributes);
  nunjucksEnvironment.addFilter('isArray', variable => Array.isArray(variable));

  nunjucksEnvironment.addGlobal('helpers', {
    generateExampleParams: params => generateExampleParams(params, nunjucksEnvironment),
    navigationHelper,
    subNavigationHelper,
  });

  nunjucksEnvironment.addGlobal('isPatternLib', true);

  return nunjucksEnvironment;
}