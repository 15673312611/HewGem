# 主题配置说明

本项目支持浅色和深色两种主题，可以通过以下方式配置：

## 1. 应用内切换

在应用导航栏右上角有主题切换按钮，点击可以随时切换主题。

## 2. Docker环境配置

在Docker环境中，可以通过环境变量设置默认主题：

```yaml
# docker-compose.yml
services:
  frontend:
    environment:
      - DEFAULT_THEME=light  # 可选值: light, dark
```

### 如何修改现有Docker容器的主题

1. 编辑docker-compose.yml文件，修改DEFAULT_THEME环境变量:

```yaml
services:
  frontend:
    environment:
      - DEFAULT_THEME=dark  # 修改为dark或light
```

2. 重新启动容器:

```bash
docker-compose down
docker-compose up -d
```

## 3. 前端配置文件

如果不使用Docker，也可以直接修改配置文件:

1. 在frontend-config目录下创建theme.json文件:

```json
{
  "theme": "dark"  // 可选值: "light", "dark"
}
```

2. 将此文件放置在应用的/config目录下。 