---
title: WordPress禁用自动保存及版本修订
url: 326.html
id: 326
categories:
  - Uncategorized
abbrlink: 5a02553e
date: 2018-05-06 23:33:47
tags:
---

[http://www.pythoner.com/27.html](http://www.pythoner.com/27.html) 参考上边博客，经过自己的测试，对我而言，第一种是有用的，也就是修改wp-includes/defaut-contants.php 文件：
```php
// 修改前
if ( !defined( 'AUTOSAVE_INTERVAL' ) )
  define( 'AUTOSAVE_INTERVAL', 60 );
if ( !defined('WP\_POST\_REVISIONS') )
  define('WP\_POST\_REVISIONS', true );
 
// 修改后
if ( !defined( 'AUTOSAVE_INTERVAL' ) )
  define( 'AUTOSAVE_INTERVAL', false );
if ( !defined('WP\_POST\_REVISIONS') )
  define('WP\_POST\_REVISIONS', false );
```