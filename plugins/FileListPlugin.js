module.exports = class FileListPlugin {
	constructor(options) {
		this.filename =
			options && options.filename ? options.filename : "file-list.md";
	}
	apply(compiler) {
		compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, cb) => {
			// 通过 compilation.assets 获取文件数量
			const keys = Object.keys(compilation.assets),
				len = keys.length,
				// 添加统计信息
				content = Object.keys(compilation.assets).reduce(
					(acc, filename) => `${acc}- ${filename}\n`,
					`# ${len} file${len > 1 ? "s" : ""} emitted by webpack\n\n`,
				);

			// 往 compilation.assets 中添加清单文件
			compilation.assets[this.filename] = {
				// 写入新文件的内容
				source: function () {
					return content;
				},
				// 新文件大小（给 webapck 输出展示用）
				size: function () {
					return content.length;
				},
			};

			// 执行回调，让 webpack 继续执行
			cb();
		});
	}
};
