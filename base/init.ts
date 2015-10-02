System.import('<%= currentPath %>app')
  .catch(e => {
    console.error('Error while loading the example. Please report it to mgechev\'s repo', e);
  });