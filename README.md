[Building a Vue3 Typescript Environment with Vite](https://miyauchi.dev/posts/vite-vue3-typescript/)

### Build project local

- step 1. docker build -t lawyer -f Dockerfile .
- step 2. docker run -d -p 8080:80 lawyer

### Build project to server

- step 1. rm -rf /dist
- step 2. tar -czvf lawyer.tar.gz --exclude=node_modules --exclude=dist --exclude=.git .
- step 3. upload to tencent cloud(scp)
- step 4. tar -zxvf lawyer.tar.gz
- step 5. su
- step 6. docker build -t lawyer -f Dockerfile .
- step 7. docker ps
- step 8. docker kill 正在执行的容器id
- step 9. docker run -d -p 80:80 -p 443:443 lawyer
