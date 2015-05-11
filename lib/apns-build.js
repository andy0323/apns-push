var shell = require('shelljs');

/**
 *	node推送证书生成
 *
 *	
 */
exports.node = function(cer_path, key_path, cer_pem_output_path, key_pem_output_path) {
	
	node(cer_path, key_path, cer_pem_output_path, key_pem_output_path);
}

/**
 *	创建node推送证书
 */
function node(cer_path, key_path, cer_pem_output_path, key_pem_output_path) {

	var cmd_cer = cmd_apns_cer_pem(cer_path, cer_pem_output_path);
	var cmd_key = cmd_apns_key_pem(key_path, key_pem_output_path);

	shell.exec(cmd_cer);
	shell.exec(cmd_key);
}

/**
 *	生成key_pem命令
 */
function cmd_apns_key_pem(key_pem, pem_output_path) {

	var cmd = 'openssl pkcs12';

	cmd = cmd_append_cmd(cmd, '-nodes');

	cmd = cmd_append_cmd(cmd, '-out');
	cmd = cmd_append_cmd(cmd, pem_output_path);

	cmd = cmd_append_cmd(cmd, '-in');
	cmd = cmd_append_cmd(cmd, key_pem);	

	return cmd;
}

/**
 *	生成cer_pem命令
 */
function cmd_apns_cer_pem(cer_path, pem_output_path) {

	var cmd = 'openssl x509';

	cmd = cmd_append_cmd(cmd, '-in');
	cmd = cmd_append_cmd(cmd, cer_path);
	
	cmd = cmd_append_cmd(cmd, '-inform der');
	
	cmd = cmd_append_cmd(cmd, '-out');
	cmd = cmd_append_cmd(cmd, pem_output_path);

	return cmd;
}

/**
 *	命令行拼接
 */
function cmd_append_cmd(cmd, new_cmd) {

	cmd += ' ';

	cmd += new_cmd;

	return cmd;
}

