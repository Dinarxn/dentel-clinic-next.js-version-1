import { spawn } from 'node:child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const edge = spawn(edgePath, ['--headless=new', '--remote-debugging-port=9223', 'about:blank']);

async function run() {
  await new Promise((r) => setTimeout(r, 1200));
  try {
    const tabsRes = await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' });
    const tab = await tabsRes.json();
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    const send = (method, params = {}) =>
      new Promise((res, rej) => {
        const curId = id++;
        const onMsg = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', onMsg);
            if (msg.error) rej(msg.error);
            else res(msg.result);
          }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:3005/' });
    await new Promise((r) => setTimeout(r, 2000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const scrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        const innerW = window.innerWidth;
        const all = document.querySelectorAll('*');
        const culprits = [];
        for (const el of all) {
          const r = el.getBoundingClientRect();
          if (r.right > innerW + 1) {
            culprits.push({
              tag: el.tagName.toLowerCase(),
              className: (el.className || '').toString().slice(0, 80),
              right: Math.round(r.right),
              width: Math.round(r.width),
              text: (el.innerText || '').slice(0, 40).replace(/\\n/g, ' ')
            });
          }
        }
        return {
          title: document.title,
          url: window.location.href,
          scrollW,
          innerW,
          hasOverflow: scrollW > innerW,
          diff: scrollW - innerW,
          culprits: culprits.slice(0, 10)
        };
      })()`,
      returnByValue: true,
    });

    console.log('Diagnosis Result:', JSON.stringify(evalRes.result.value, null, 2));
    ws.close();
  } catch (err) {
    console.error('Error during diagnosis:', err);
  } finally {
    edge.kill();
  }
}

run();
