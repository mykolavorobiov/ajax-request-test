fetchRequest = {
  name: 'fetch',
  req: () => {
    const options = {
      method: 'GET',
      mode: 'cors'
    };
    const request = new Request('https://5b93c838bd13d3001426965b.mockapi.io/v1/posts');
    return fetch(request, options)
      .then(response => response.json())
  }
};
