#!/usr/bin/env node
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

const templates = {
  simple: '# {name}\n\n{description}\n\n## Installation\n```bash\nnpm install\n```\n\n## Usage\n```bash\nnpm start\n```\n\nMIT - [@yksanjo](https://github.com/yksanjo)',
  cli: '# {name}\n\n<p align="center"><a href="{url}"><img src="https://img.shields.io/github/stars/{user}/{name}?style=social" alt="Stars"></a></p>\n\n{description}\n\n## Features\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Installation\n```bash\nnpm install -g {name}\n```\n\n## Usage\n```bash\n{name} start\n```\n\n## License\nMIT - [@yksanjo](https://github.com/yksanjo)',
  full: '# {name}\n\n<p align="center"><a href="{url}"><img src="https://img.shields.io/github/stars/{user}/{name}?style=social" alt="Stars"></a> <img src="https://img.shields.io/github/license/{user}/{name}" alt="License"></a></p>\n\n{description}\n\n## 🚀 Features\n- Feature 1\n- Feature 2\n- Feature 3\n\n## 📦 Installation\n```bash\nnpm install {name}\n# or\nyarn add {name}\n```\n\n## 🎯 Usage\n```javascript\nconst { name } = require("{name}");\n// or\nimport { name } from "{name}";\n```\n\n## 🤝 Contributing\nContributions are welcome!\n\n## 📝 License\nMIT - [@yksanjo](https://github.com/yksanjo)'
};

async function main() {
  console.log(chalk.cyan('\n📝 README Generator V2\n'));
  
  const { template, name, description, url, user } = await inquirer.prompt([
    { name: 'template', type: 'list', message: 'Choose template:', choices: ['simple', 'cli', 'full'] },
    { name: 'name', type: 'input', message: 'Project name:', default: 'my-project' },
    { name: 'description', type: 'input', message: 'Description:' },
    { name: 'url', type: 'input', message: 'GitHub URL:', default: 'https://github.com/user/project' },
    { name: 'user', type: 'input', message: 'GitHub username:', default: 'yksanjo' }
  ]);
  
  let content = templates[template]
    .replace(/{name}/g, name)
    .replace(/{description}/g, description)
    .replace(/{url}/g, url)
    .replace(/{user}/g, user);
  
  fs.writeFileSync('README.md', content);
  console.log(chalk.green('\n✅ README.md generated!'));
}
if (require.main === module) main().catch(console.error);
module.exports = { main };
