import request from '@/utils/request';
import axios from 'axios';

/**
 * 获取 OSS 文件上传预签名 URL
 * @param fileName 文件原始名称
 * @param directory OSS 存储目录前缀
 * @param expireSeconds 过期时间（秒），默认为3600秒（1小时）
 */
export async function getOssToken(fileName, directory = 'uploads', expireSeconds = 3600) {
  const res = await request.get('/api/oss/presigned-url', {
    params: { fileName, directory, expireSeconds },
  });
  if (res.code !== 200) {
    throw new Error(res.message || '获取 OSS 上传凭证失败');
  }
  return res.data;
}

/**
 * 上传文件到 OSS
 * @param file File 对象
 * @param directory OSS 存储目录前缀
 * @param expireSeconds 过期时间（秒），默认为3600秒（1小时）
 * @returns {Promise<string>} 资源访问 URL
 */
export async function uploadFileToOss(file, directory, expireSeconds = 3600) {
  // 获取预签名表单字段
  const token = await getOssToken(file.name, directory, expireSeconds);
  
  // 构建FormData，包含所有token字段和文件
  const formData = new FormData();
  Object.entries(token).forEach(([key, value]) => {
    // 排除resourceUrl上传结果字段
    if (key === 'resourceUrl') return;
    formData.append(key, value);
  });
  formData.append('file', file);
  
  // 使用POST表单方式上传到OSS
  const response = await fetch(token.host || token.uploadUrl, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('OSS上传失败响应:', response.status, text);
    throw new Error(`OSS上传失败，状态码：${response.status}`);
  }
  // 返回最终资源访问URL
  return token.resourceUrl;
} 