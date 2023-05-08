sudo yum update
sudo yum install -y git

git clone https://github.com/mykolakovenko/queue-demo.git
cd queue-demo/
npm install
npm start > app.log 2>&1 &
