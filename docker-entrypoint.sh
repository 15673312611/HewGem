#!/bin/sh

# 默认主题
DEFAULT_THEME="${DEFAULT_THEME:-light}"

# 确保配置目录存在
mkdir -p /usr/share/nginx/html/config

# 创建主题配置文件
echo "{\"theme\":\"$DEFAULT_THEME\"}" > /usr/share/nginx/html/config/theme.json
echo "Generated theme config: theme=$DEFAULT_THEME"

# 启动Nginx
exec nginx -g "daemon off;" 