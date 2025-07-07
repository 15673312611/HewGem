# AI文案创作角色配置说明

## 数据库表结构

1. 首先执行 `ai_role_table.sql` 文件，创建必要的数据库表：
   - `ai_role` 表：存储AI角色信息，包括名称、描述、提示词模板等
   - `ai_conversation` 表：存储用户与AI角色的对话记录

## 数据初始化

1. 执行 `ai_role_insert.sql` 文件，向数据库中插入7个预设的AI文案创作角色：
   - 口播文案
   - 文案改写
   - 标题生成
   - 翻译
   - 产品推广文案
   - 电商带货
   - 知识科普

## 图标资源准备

1. 根据 `ai_role_images.sql` 中的说明，准备7个角色对应的图标文件
2. 创建目录 `/static/images/ai-roles/`（如果不存在）
3. 将准备好的图标文件放入该目录，并按照以下命名：
   - broadcast.png - 口播文案（蓝色麦克风图标）
   - rewrite.png - 文案改写（带有A和改写符号的图标）
   - title.png - 标题生成（带有AI标志的橙色图标）
   - translate.png - 翻译（绿色FAQ/对话图标）
   - promotion.png - 产品推广文案（蓝色靶心/营销图标）
   - ecommerce.png - 电商带货（橙色礼物/商品图标）
   - science.png - 知识科普（紫色书籍/科普图标）

## 表结构说明

### ai_role 表

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | bigint | 主键ID |
| name | varchar(50) | 角色名称 |
| description | varchar(200) | 角色描述 |
| prompt | text | 提示词模板 |
| input_placeholder | varchar(100) | 输入框提示文字 |
| word_limit | int | 默认生成字数 |
| ai_model | varchar(50) | AI模型，如gpt-3.5-turbo |
| role_type | varchar(50) | 角色类型，如copywriting |
| icon | varchar(255) | 角色图标路径 |
| create_time | datetime | 创建时间 |
| update_time | datetime | 更新时间 |

### ai_conversation 表

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | bigint | 主键ID |
| user_id | bigint | 用户ID |
| role_id | bigint | 角色ID |
| role_name | varchar(50) | 角色名称 |
| title | varchar(100) | 对话标题 |
| content | text | 对话内容JSON |
| role_type | varchar(50) | 角色类型 |
| create_time | datetime | 创建时间 |
| update_time | datetime | 更新时间 |

## 注意事项

1. 确保MySQL数据库版本兼容，建议使用MySQL 5.7或以上版本
2. 图标文件建议使用PNG格式，尺寸建议为200x200像素
3. 如需修改角色配置，可以直接在数据库中更新相应记录
4. 前端页面会自动从后端API获取这些角色数据并展示

## 角色提示词说明

每个角色都配置了专业的提示词模板，用于指导AI生成相应类型的文案：

1. **口播文案**：生成适合口播的简洁、有吸引力的文案，注重节奏感和停顿
2. **文案改写**：优化现有文案，使其更加吸引人、更有说服力，保持核心信息不变
3. **标题生成**：创建5-10个吸引人的标题，包含数字、问句、情感词汇或悬念元素
4. **翻译**：准确翻译各种语言文本，保持原文的意思、语气和风格
5. **产品推广文案**：创作突出产品卖点和用户价值的推广文案，结合情感诉求和逻辑论证
6. **电商带货**：撰写电商带货文案，介绍商品卖点、功能和优势，营造购买欲望
7. **知识科普**：创作通俗易懂的科普文章，使用生动有趣的语言解释科学知识 