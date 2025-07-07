-- AI角色表创建语句
CREATE TABLE IF NOT EXISTS `ai_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) NOT NULL COMMENT '角色名称',
  `description` varchar(200) DEFAULT NULL COMMENT '角色描述',
  `prompt` text NOT NULL COMMENT '提示词模板',
  `input_placeholder` varchar(100) DEFAULT NULL COMMENT '输入框提示文字',
  `word_limit` int(11) DEFAULT 500 COMMENT '默认生成字数',
  `needs_word_limit` tinyint(1) DEFAULT '1' COMMENT '是否需要字数限制',
  `ai_model` varchar(50) DEFAULT 'gpt-3.5-turbo' COMMENT 'AI模型',
  `role_type` varchar(50) DEFAULT 'copywriting' COMMENT '角色类型',
  `icon` varchar(255) DEFAULT NULL COMMENT '角色图标',
  `is_system` tinyint(1) DEFAULT '0' COMMENT '是否系统预设角色',
  `creator_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
  `sort_order` int(11) DEFAULT '0' COMMENT '排序顺序',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_role_type` (`role_type`),
  KEY `idx_creator_id` (`creator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COMMENT='AI角色表';

-- AI对话记录表创建语句
CREATE TABLE IF NOT EXISTS `ai_conversation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `role_name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `title` varchar(100) DEFAULT NULL COMMENT '对话标题',
  `content` text COMMENT '对话内容JSON',
  `role_type` varchar(50) DEFAULT 'copywriting' COMMENT '角色类型',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_role_id` (`role_id`),
  KEY `idx_role_type` (`role_type`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COMMENT='AI对话记录表'; 