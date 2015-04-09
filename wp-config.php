<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'sellforce');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'mysql');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '<~g&P0G/Ki_n:li5y604J5!Z+Oq=Nl,Js>`P-*Xl*nv{v}Ac|}LAGRz@{;}a~7D*');
define('SECURE_AUTH_KEY',  'X)]wv:4_&j[OE-!G,+|.)HHF(:)*hM+3nKx6Zjyh4u PmV> ch)=@se-R~(?H<g)');
define('LOGGED_IN_KEY',    '/FVmSOIZqt1Lttn) !zGkNM|RdH%m!d1^w+eRPZc1)FNhyHl]}~n}mmt[$7!3%~$');
define('NONCE_KEY',        'ngO45VN18fuBdSJhBe[X(d8TtqQ.<VIk&{GKVGMZlbp+ZW+D}6T>9*!HeWj3K>&d');
define('AUTH_SALT',        'Wf4h-MiCZHL2`ZiB%Hr^Nx7dfvsXMQP| 92wOH.j(dX45dYowV^/@,|fj-|;$#a5');
define('SECURE_AUTH_SALT', '4f],arfgSa{o{!*a{s0&J-cCc.+?1+{EEye&F.$:DnP9B7`J:1+o{.|Q_!@+u;3*');
define('LOGGED_IN_SALT',   'Q{<TL3XtuxGo|@R-A:A{%JA7E-4 {SKGq:PH:?^%XOp A?`(izF1oUe>7k;}VVY2');
define('NONCE_SALT',       '3<b5$w-DLgqL O-sTd7$QpAPt@6:AA?*K^q1kcq-k%RPF!e8t-mPg)gU:6Pqs-eu');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
