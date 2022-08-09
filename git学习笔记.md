# gitHub学习笔记

## 1 起步

#### 1.设置邮箱和名称 

git config --global user.name[user.emial] "duxxxx1011[@xx.com]" 

#### 2.ssh公钥添加 

本地创建ssh-keygen -t rsa[<u>ed25519</u>] -C "@xxx.com"    

github2022/3/15开始不能用rsa算法加密 改用

进入~/.ssh 复制id-ras.pub的内容 clip< id-ras.pub/cat打印再复制

进入github添加 这样创建连接的时候就不用像https每次都要输入账号密码

#### 3.连接仓库

在github上创建一个register

在本地项目中 git init 初始化git

git add origin git@github.com: duxxxx1011/registerName.git 就会配置一个gitHub仓库地址 可以打印cat /.git/config 查看

#### 4.开始上传

git add 文件 可以将文件放到暂存区

git commit -m "备注内容" 可以将暂存区的内容提交到head区(理解为本地存储的最后一次提交结果)

git branch -m 分支名 可以创建分支

git push origin 分支名 可以将head的内容更新到远程服务器

#### 5.关于分支

##### 1.概念

理解：创建指针指向当前head区内容

##### 2.操作 

- 创建并切换git checkout -b 分支名
- 切换 git checkout 分支名
- 删除 git branch -d 分支名
- 使他人可见分支 git push origin 分支名
- 更新 获取并合并远端的改动 git pull
- 合并 git merge 分支名 将其他分支合并到当前分支
- 合并冲突 只能修改文件合并 改完后 git add 文件名
- 预览差异 git diff <source branch><target branch>

## 2 git-flow 开发规范