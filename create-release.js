const tagAndRelease  = require('tag-and-release');
const pandagoCommitMessage = getNamedArgVal('--pg_commit_msg');
const hugoCommitMessage = getNamedArgVal('--hs_commit_msg');
const fs = require('fs');

(async function () {
  const res = await tagAndRelease.run({repo: '../hugo-sundries', commitMessage: hugoCommitMessage});
  console.log(res)
  const pandogoModFileUpdated = fs.readFileSync('./go.mod', 'utf-8').split('\n').map(line => {
    if (line.indexOf('require github.com/andrew-paterson/hugo-sundries') > -1) {
      line = `require github.com/andrew-paterson/hugo-sundries ${res.results.tag} // indirect`
    }
    return line;
  }).join('\n');
  fs.writeFileSync('./go.mod', pandogoModFileUpdated);
  console.log(`Updated hugo-sundries version in pandago/go.mod to  ${res.results.tag}`);
  const final = await tagAndRelease.run({commitMessage: pandagoCommitMessage});
  console.log(final)

})()

// tagAndRelease.run({commitMessage: 'New commit'})
function getNamedArgVal(requested) {
  const [ , , ...args ] = process.argv;
  var val;
  args.forEach(arg => {
    if (arg.indexOf('=') < 0) { return; }
    var argName = arg.split('=')[0];
    if (argName === requested) {
      val = arg.split('=')[1];
    }
  });
  return val;
}

