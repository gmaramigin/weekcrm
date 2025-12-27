<?php

// see system/default/config.php for configurable parameters

// Security: Block using RedirectMatch FIRST (processed before RewriteRules)
// This is added at the very beginning of .htaccess
$_config['custom_htaccess_directives'] = '
# ============================================================
# SECURITY: Block sensitive files FIRST (before any redirects)
# ============================================================
<IfModule mod_alias.c>
  RedirectMatch 403 (?i)\.(psa|sql)$
  RedirectMatch 403 (?i)\.htaccess$
  RedirectMatch 403 (?i)/user/settings\.json$
  RedirectMatch 403 (?i)/user/config\.php$
  RedirectMatch 403 (?i)/system/core\.php$
  RedirectMatch 403 (?i)/system/default/config\.php$
  RedirectMatch 403 (?i)/user/logs/
  RedirectMatch 403 (?i)/user/backup/
  RedirectMatch 403 (?i)/user/caches/
  RedirectMatch 403 (?i)/video/\.htaccess$
  RedirectMatch 403 (?i)/audio/\.htaccess$
  RedirectMatch 403 (?i)/pictures/.*\.htaccess$
</IfModule>
';

// Security: Backup RewriteRules (added inside mod_rewrite block)
$_config['custom_htaccess_rewrites'] = '
# Security: Block sensitive file types with 403 Forbidden (backup rules)
RewriteCond %{REQUEST_URI} \.(psa|sql)$ [NC,OR]
RewriteCond %{REQUEST_URI} \.htaccess$ [NC,OR]
RewriteCond %{REQUEST_URI} settings\.json$ [NC,OR]
RewriteCond %{REQUEST_URI} /user/config\.php$ [NC,OR]
RewriteCond %{REQUEST_URI} /system/core\.php$ [NC,OR]
RewriteCond %{REQUEST_URI} /system/default/config\.php$ [NC,OR]
RewriteCond %{REQUEST_URI} /user/logs/ [NC,OR]
RewriteCond %{REQUEST_URI} /user/backup/ [NC,OR]
RewriteCond %{REQUEST_URI} /user/caches/ [NC]
RewriteRule .* - [F,L]
';
?>
