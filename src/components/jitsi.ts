export const jitsiApi = (api: string): Promise<void> => {
  return new Promise((resolve) => {
    const myWindow = window as any;
    if (myWindow.JitsiMeetExternalAPI) {
      resolve(myWindow.JitsiMeetExternalAPI);
    } else {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');

      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', api);

      head.addEventListener(
        'load',
        function (event: any) {
          if (event.target.nodeName === 'SCRIPT') {
            resolve(myWindow.JitsiMeetExternalAPI);
          }
        },
        true
      );

      head.appendChild(script);
    }
  });
};
