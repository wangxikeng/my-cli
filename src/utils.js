import fs from 'node:fs';
import download from 'download-git-repo'
import ora from 'ora'
export const checkPath = (path) => {
    // 验证路径是否存在
    return fs.existsSync(path);
}

export const downloadTemplate = async (branch, path) => {
    return new Promise((resolve, reject) => {
        const spinner = ora('正在下载模板...').start();
        download(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, path, { clone: true }, function (err) {
            if (err) {
                spinner.fail('下载模板失败');
                reject(err)
            }
            else {
                spinner.succeed('下载模板成功');
                resolve()
            }
        })
    })
}
