let headers = {
  TITLE: getInput('TITLE'),
  VERSION: getInput('VERSION'),
  TYPE: getInput('TYPE'),
  TAGS: getInput('TAGS'),
  DESCRIPTION: getInput('DESCRIPTION')
};

function updateHeadersValues() {
  headers.TITLE = getInput('TITLE');
  headers.VERSION = getInput('VERSION');
  headers.TYPE = getInput('TYPE');
  headers.TAGS = getInput('TAGS');
  headers.DESCRIPTION = getInput('DESCRIPTION');
}
