#!/bin/sh

handle=$1;
env='test';

echo "初始化脚本程序...$1"

emptyRemoteDist(){
    if [ $env == "prod" ]
    then
        echo "删除项目目录里面的东西prod"
        ssh -i key.pub root@192.168.231.128 "rm -rf /home/demo/*"
    else
        echo "删除项目目录里面的东西test"
        ssh -i key.pub root@192.168.231.128 "rm -rfv /home/demo/*" | tee a.log
    fi
}
# 发送文件到测试服
transferFileToTestSever(){
    echo "提交本地打包文件到线上目录"
    # scp -r ./dist/* root@yourip:/www/jiketoutiao_admin/
    scp -i key.pub -r ./dist root@192.168.231.128:/home/demo/
    echo $?
    echo "上传完成"
}

echo "上传代码到线上正在准备代码....."
echo "......."


if [ $handle == "build" ]
then
    if [ $env == "prod" ]
    then
        echo "没有正式地址....."
    else
        env='dev'
        echo "开始打包文件"
        # yarn build
        emptyRemoteDist
        transferFileToTestSever
    fi
else
    echo '没有输入一个有效的命令'
    echo '重定向.....'
    sh ./deploy.sh build
fi

echo "上传完成,按任意键退出"
read
