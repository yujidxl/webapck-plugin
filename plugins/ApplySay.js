module.exports =  class ApplySay {
  apply(compiler) {
    compiler.hooks.done.tap('applySay', (stats) => {
      console.log('done, success! ');
    })
  }
}