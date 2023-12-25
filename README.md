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

### Build project to server lastest

把Dockerfile里的`RUN yarn && yarn build`注释掉
把.dockerignore里的dist删除

- step 1. yarn build
- step 2. tar -czvf lawyer.tar.gz --exclude=.git .
- step 3. upload to tencent cloud(scp)
- step 4. su
- step 5. tar -zxvf lawyer.tar.gz
- step 6. docker build -t lawyer -f Dockerfile .
- step 7. docker ps
- step 8. docker kill 正在执行的容器id
- step 9. docker run -d -p 80:80 -p 443:443 lawyer
