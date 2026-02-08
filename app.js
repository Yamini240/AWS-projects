const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // Calculate system metrics
    const uptime = Math.floor(os.uptime() / 60);
    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const cpuModel = os.cpus()[0].model;

    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DevOps Monitoring Dashboard</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a2e; color: #e9e9e9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background-color: #16213e; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #0f3460; width: 400px; }
                h1 { color: #00d2ff; border-bottom: 2px solid #0f3460; padding-bottom: 10px; }
                .metric { display: flex; justify-content: space-between; margin: 15px 0; font-size: 1.1rem; }
                .label { color: #95a5a6; }
                .value { font-weight: bold; color: #4ee44e; }
                .footer { margin-top: 20px; font-size: 0.8rem; color: #536162; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Server Monitor</h1>
                <div class="metric"><span class="label">OS Platform:</span> <span class="value">${os.platform()} (${os.arch()})</span></div>
                <div class="metric"><span class="label">System Uptime:</span> <span class="value">${uptime} Minutes</span></div>
                <div class="metric"><span class="label">Total Memory:</span> <span class="value">${totalMem} GB</span></div>
                <div class="metric"><span class="label">Free Memory:</span> <span class="value">${freeMem} GB</span></div>
                <div class="metric"><span class="label">CPU:</span> <span class="value" style="font-size: 0.8rem;">${cpuModel}</span></div>
                
                <div class="footer">
                    Deployed via <strong>AWS CodePipeline</strong> <br>
                    Environment: AWS Elastic Beanstalk (Linux)
                </div>
            </div>
        </body>
        </html>
    `);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Monitoring app running on port ${port}`);
});