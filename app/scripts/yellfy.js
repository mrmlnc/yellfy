(() => {
  const req = new XMLHttpRequest();
  const _responseHandler = (responseText) => {
    let latestTag;
    try {
      latestTag = JSON.parse(responseText)[0];
    } catch (err) {
      throw new Error('Ha-ha, GitHub! Bad JSON.');
    }

    console.log(`The latest version of Yellfy — ${latestTag.name}!`);
  };

  req.open('GET', 'https://api.github.com/repos/mrmlnc/yellfy/tags', true);
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status === 200) {
        _responseHandler(req.responseText);
      } else {
        throw new Error('Error loading page\n');
      }
    }
  };

  req.send(null);
})();
