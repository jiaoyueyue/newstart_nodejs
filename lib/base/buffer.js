// js语言自身只有字符串数据类型, 没有二进制数据类型;因此Nodejs提供了一个与String对等的全局构造函数Buffer来提供对二进制数据的操作
// 除了可以读取文件得到Buffer实例外, 还能够直接构造, 例如: 
const bin = new Buffer([0x68, 0x65, 0x6c, 0x6f]);

// Buffer与字符串类似, 除了可以用.length得到字节的长度外, 还可以用[index]方式读取指定位置的字节, 例如: 
bin[0];

// buffer与字符串能够相互转化, 例如可以使用指定编码将二进制数据准话为字符串
const str = bin.toString('utf-8');

// 或者反过来, 将字符串转化为制定编码的二进制数据
const binStr = new Buffer('hello', 'utf-8');

// Buffer与字符串有一个重要区别. 字符串是只读的, 并且对字符串的任何修改得到的都是一个新字符串, 原字符串保持不变.
// 至于Buffer, 更像是可以做指定操作的c语言数组. 例如可以用[index]方式直接修改某个位置的字节
bin[0] = 0x48;

// 而slice方法也不是返回一个新的Buffer, 更像是返回了指向原Buffer中间某个位置的指针, 因此对.slice方法返回的Buffer的修改会作用于原Buffer:
const sub = bin.slice(2);
sub[0] = 0x65;
console.log(bin);

// 因此, 如果想拷贝一份Buffer, 首先创建一个新的Buffer, 并通过.copy方法把原Buffer中的数据复制过去.
// 这个类似于申请一块新的内存, 并把已有内存中的数据复制过去

const dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x49;
console.log(111, bin);
console.log(222, dup);


// Buffer将JS的数据处理能力从字符串扩展到了任意二进制数据

