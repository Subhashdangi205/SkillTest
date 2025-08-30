// quiz.js
// Handles quiz flow: loads questions per selectedLanguage,
// only Next button for navigation (no auto next timer).

// session & storage keys
const sessionKey = "qa_currentUser";
const usersKey = "qa_users";
const lastScoreKey = "qa_lastScore";
const selectedLangKey = "selectedLanguage";

// Basic question bank per language
const questionBank = {
 "C": [
    { question: "Which header file is required for printf() in C?", options: ["<stdio.h>", "<conio.h>", "<math.h>", "<string.h>"], answer: "<stdio.h>" },
    { question: "Which operator is used to get address of a variable?", options: ["&", "*", "%", "$"], answer: "&" },
    { question: "Which loop is guaranteed to execute at least once?", options: ["for", "while", "do-while", "if"], answer: "do-while" },
    { question: "Which keyword is used to define a constant in C?", options: ["final", "const", "define", "static"], answer: "const" },
    { question: "What is the default return type of functions in C if not specified?", options: ["int", "void", "float", "char"], answer: "int" },
    { question: "Which function is used to dynamically allocate memory?", options: ["malloc()", "alloc()", "calloc()", "realloc()"], answer: "malloc()" },
    { question: "Which function is used to release allocated memory?", options: ["free()", "delete()", "dispose()", "clear()"], answer: "free()" },
    { question: "Which of these is a storage class in C?", options: ["auto", "public", "protected", "volatile"], answer: "auto" },
    { question: "Which operator is used for pointer dereferencing?", options: ["*", "&", "->", "."], answer: "*" },
    { question: "Which is not a valid C data type?", options: ["int", "float", "bool", "double"], answer: "bool" },
    { question: "Which keyword is used to stop a loop?", options: ["end", "stop", "exit", "break"], answer: "break" },
    { question: "Which function compares two strings?", options: ["strcmp()", "strcomp()", "compare()", "stringcmp()"], answer: "strcmp()" },
    { question: "What is sizeof(char) in C?", options: ["1", "2", "4", "Depends on Compiler"], answer: "1" },
    { question: "Which type of language is C?", options: ["High-level", "Low-level", "Middle-level", "Assembly"], answer: "Middle-level" },
    { question: "Which symbol is used for single-line comment in C?", options: ["//", "/*", "#", "--"], answer: "//" },
    { question: "What is the default value of static variables in C?", options: ["0", "garbage", "null", "undefined"], answer: "0" },
    { question: "Which operator is used to access array elements?", options: ["*", "&", "[]", "{}"], answer: "[]" },
    { question: "Which keyword prevents modification of a variable?", options: ["final", "const", "static", "lock"], answer: "const" },
    { question: "Which function is used to read a character in C?", options: ["scanf()", "getchar()", "gets()", "fgetc()"], answer: "getchar()" },
    { question: "Which header is required for string functions?", options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<ctype.h>"], answer: "<string.h>" },
    { question: "Which operator is used for logical AND?", options: ["&", "&&", "||", "and"], answer: "&&" },
  { question: "Which operator is used for logical OR?", options: ["|", "||", "or", "&&"], answer: "||" },
  { question: "Which loop is used when number of iterations is known?", options: ["for", "while", "do-while", "foreach"], answer: "for" },
  { question: "Which function is used to allocate memory and initialize to zero?", options: ["malloc()", "calloc()", "realloc()", "alloc()"], answer: "calloc()" },
  { question: "Which function changes size of allocated memory?", options: ["malloc()", "realloc()", "free()", "calloc()"], answer: "realloc()" },
  { question: "Which keyword is used to define a structure?", options: ["struct", "class", "union", "object"], answer: "struct" },
  { question: "Which keyword is used to define a union?", options: ["struct", "union", "object", "class"], answer: "union" },
  { question: "Which function is used to read a string from console?", options: ["scanf()", "gets()", "getchar()", "fgets()"], answer: "gets()" },
  { question: "Which function reads a line safely with buffer limit?", options: ["scanf()", "gets()", "fgets()", "getline()"], answer: "fgets()" },
  { question: "Which operator is used for bitwise AND?", options: ["&", "&&", "|", "^"], answer: "&" },

  // 31
  { question: "Which operator is used for bitwise OR?", options: ["&", "&&", "|", "||"], answer: "|" },
  { question: "Which operator is used for bitwise XOR?", options: ["^", "&", "|", "&&"], answer: "^" },
  { question: "Which header is required for malloc() and free()?", options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"], answer: "<stdlib.h>" },
  { question: "Which keyword is used to return a value from function?", options: ["return", "break", "goto", "exit"], answer: "return" },
  { question: "Which statement is used to skip current iteration?", options: ["skip", "break", "continue", "exit"], answer: "continue" },
  { question: "Which keyword is used for unconditional jump?", options: ["goto", "break", "continue", "exit"], answer: "goto" },
  { question: "Which function is used to convert string to integer?", options: ["atoi()", "atof()", "strtol()", "strtoi()"], answer: "atoi()" },
  { question: "Which function is used to convert string to float?", options: ["atoi()", "atof()", "strtol()", "strtof()"], answer: "atof()" },
  { question: "Which keyword is used to declare external variable?", options: ["extern", "global", "static", "auto"], answer: "extern" },

  // 41
  { question: "Which function is used to open a file?", options: ["fopen()", "fread()", "fwrite()", "fclose()"], answer: "fopen()" },
  { question: "Which function is used to read data from file?", options: ["fopen()", "fread()", "fwrite()", "fclose()"], answer: "fread()" },
  { question: "Which function is used to write data to file?", options: ["fopen()", "fread()", "fwrite()", "fclose()"], answer: "fwrite()" },
  { question: "Which function is used to close a file?", options: ["fopen()", "fread()", "fwrite()", "fclose()"], answer: "fclose()" },
  { question: "Which function moves file pointer to specific location?", options: ["fseek()", "ftell()", "rewind()", "fgetpos()"], answer: "fseek()" },
  { question: "Which function returns current file pointer position?", options: ["fseek()", "ftell()", "rewind()", "fgetpos()"], answer: "ftell()" },
  { question: "Which function resets file pointer to beginning?", options: ["fseek()", "ftell()", "rewind()", "fgetpos()"], answer: "rewind()" },
  { question: "Which function is used to remove a file?", options: ["remove()", "unlink()", "delete()", "erase()"], answer: "remove()" },
  { question: "Which function is used to rename a file?", options: ["rename()", "change()", "move()", "replace()"], answer: "rename()" },

  // 51
  { question: "Which function checks end-of-file?", options: ["feof()", "ferror()", "fclose()", "fseek()"], answer: "feof()" },
  { question: "Which is correct syntax to define a pointer?", options: ["int *p;", "int &p;", "int p*;", "int p;"], answer: "int *p;" },
  { question: "Which operator is used to access structure members via pointer?", options: ["->", ".", "&", "*"], answer: "->" },
  { question: "Which keyword is used for conditional compilation?", options: ["#ifdef", "#include", "#define", "#pragma"], answer: "#ifdef" },
  { question: "Which directive includes another file?", options: ["#include", "#define", "#pragma", "#if"], answer: "#include" },
  { question: "Which directive defines a macro?", options: ["#define", "#include", "#ifdef", "#pragma"], answer: "#define" },
  { question: "Which directive is used to issue compiler-specific instructions?", options: ["#pragma", "#include", "#define", "#if"], answer: "#pragma" },
  { question: "Which operator is used to access value pointed by pointer?", options: ["*", "&", "->", "."], answer: "*" },
  { question: "Which keyword is used to define a function?", options: ["void", "function", "def", "func"], answer: "void" },

  // 61
  { question: "Which operator is used for ternary conditional?", options: ["?:", "??", "ifelse", "?:"], answer: "?:" },
  { question: "Which keyword declares variable inside block scope?", options: ["auto", "register", "static", "extern"], answer: "auto" },
  { question: "Which storage class persists value across function calls?", options: ["auto", "register", "static", "extern"], answer: "static" },
  { question: "Which storage class stores variable globally?", options: ["auto", "register", "static", "extern"], answer: "extern" },
  { question: "Which function terminates program immediately?", options: ["exit()", "return", "abort()", "stop()"], answer: "exit()" },
  { question: "Which function returns absolute value?", options: ["abs()", "fabs()", "ceil()", "floor()"], answer: "abs()" },
  { question: "Which header is required for abs()?", options: ["<stdio.h>", "<stdlib.h>", "<math.h>", "<string.h>"], answer: "<stdlib.h>" },
  { question: "Which function returns floor value?", options: ["floor()", "ceil()", "round()", "trunc()"], answer: "floor()" },
  { question: "Which function returns ceil value?", options: ["floor()", "ceil()", "round()", "trunc()"], answer: "ceil()" },

  // 71
  { question: "Which operator is used for modulus?", options: ["%", "&", "/", "*"], answer: "%" },
  { question: "Which operator is used for increment?", options: ["++", "--", "+", "-"], answer: "++" },
  { question: "Which operator is used for decrement?", options: ["++", "--", "+", "-"], answer: "--" },
  { question: "Which operator is used for assignment?", options: ["=", "==", "+=", "-="], answer: "=" },
  { question: "Which operator is used for equality check?", options: ["=", "==", "!=", "==="], answer: "==" },
  { question: "Which operator is used for not equal?", options: ["!=", "==", "=", "==="], answer: "!=" },
  { question: "Which operator is used for bitwise shift left?", options: ["<<", ">>", "<<<", ">>>"], answer: "<<" },
  { question: "Which operator is used for bitwise shift right?", options: [">>", "<<", ">>>", "<<<"], answer: ">>" },
  { question: "Which function is used to convert uppercase to lowercase?", options: ["tolower()", "toupper()", "strlwr()", "strupr()"], answer: "tolower()" },

  // 81
  { question: "Which function is used to convert lowercase to uppercase?", options: ["tolower()", "toupper()", "strlwr()", "strupr()"], answer: "toupper()" },
  { question: "Which function is used to find length of string?", options: ["strlen()", "strlength()", "sizeof()", "count()"], answer: "strlen()" },
  { question: "Which function concatenates two strings?", options: ["strcat()", "strcopy()", "strappend()", "strmerge()"], answer: "strcat()" },
  { question: "Which function copies string?", options: ["strcpy()", "strcat()", "strncpy()", "strmerge()"], answer: "strcpy()" },
  { question: "Which function copies n characters of string?", options: ["strncpy()", "strcpy()", "strcat()", "strncat()"], answer: "strncpy()" },
  { question: "Which function appends n characters of string?", options: ["strncat()", "strcat()", "strcpy()", "strncpy()"], answer: "strncat()" },
  { question: "Which function compares strings ignoring case?", options: ["strcmp()", "strcasecmp()", "strcmpi()", "stricmp()"], answer: "strcasecmp()" },
  { question: "Which function finds first occurrence of character in string?", options: ["strchr()", "strfind()", "strindex()", "strlocate()"], answer: "strchr()" },
  { question: "Which function finds last occurrence of character in string?", options: ["strrchr()", "strfindlast()", "strrindex()", "strlast()"], answer: "strrchr()" },

  // 91
  { question: "Which function finds first occurrence of substring?", options: ["strstr()", "strfind()", "strindex()", "strlocate()"], answer: "strstr()" },
  { question: "Which function finds first occurrence of substring in reverse?", options: ["strrstr()", "strrevfind()", "strrindex()", "strrstrrev()"], answer: "N/A" },
  { question: "Which header is required for math functions?", options: ["<stdio.h>", "<stdlib.h>", "<math.h>", "<string.h>"], answer: "<math.h>" },
  { question: "Which function returns square root?", options: ["sqrt()", "pow()", "exp()", "log()"], answer: "sqrt()" },
  { question: "Which function returns power value?", options: ["sqrt()", "pow()", "exp()", "log()"], answer: "pow()" },
  { question: "Which function returns exponential?", options: ["sqrt()", "pow()", "exp()", "log()"], answer: "exp()" },

  ],

  "C++": [
    { question: "Which feature is not in C++?", options: ["Classes", "Inheritance", "Garbage Collection", "Polymorphism"], answer: "Garbage Collection" },
    { question: "Which operator is used for scope resolution?", options: ["::", "->", ":", "."], answer: "::" },
    { question: "Which STL container is ordered and unique?", options: ["vector", "set", "list", "map"], answer: "set" },
    { question: "Which OOP concept allows function overloading?", options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], answer: "Polymorphism" },
    { question: "Which keyword is used to create objects dynamically?", options: ["malloc", "calloc", "new", "alloc"], answer: "new" },
    { question: "Which keyword is used to destroy objects created with new?", options: ["delete", "remove", "free", "dispose"], answer: "delete" },
    { question: "Which access specifier is default for class members?", options: ["public", "private", "protected", "friend"], answer: "private" },
    { question: "Which of these is not a type of constructor?", options: ["Default", "Copy", "Parameterized", "Virtual"], answer: "Virtual" },
    { question: "Which feature of OOP is achieved by 'virtual' keyword?", options: ["Abstraction", "Encapsulation", "Runtime Polymorphism", "Compile-time Polymorphism"], answer: "Runtime Polymorphism" },
    { question: "Which operator is overloaded by 'cout'?", options: ["<<", ">>", "+", "="], answer: "<<" },
    { question: "Which function is called automatically when object is destroyed?", options: ["Constructor", "Destructor", "Delete", "Finalize"], answer: "Destructor" },
    { question: "Which of these is not part of OOP?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"], answer: "Compilation" },
    { question: "Which keyword defines inheritance?", options: ["extends", "inherits", ":", "->"], answer: ":" },
    { question: "Which container allows duplicate elements in C++?", options: ["set", "multiset", "map", "unordered_set"], answer: "multiset" },
    { question: "Which function must be overridden in abstract class?", options: ["Virtual function", "Constructor", "Destructor", "Inline"], answer: "Virtual function" },
    { question: "Which feature allows reusability of code?", options: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"], answer: "Inheritance" },
    { question: "Which operator cannot be overloaded?", options: ["+", "=", "::", "[]"], answer: "::" },
    { question: "Which keyword is used to declare constant members?", options: ["static", "const", "final", "immutable"], answer: "const" },
    { question: "Which type of casting is safe in C++?", options: ["static_cast", "dynamic_cast", "const_cast", "reinterpret_cast"], answer: "dynamic_cast" },
    { question: "Which C++ feature provides data hiding?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Overloading"], answer: "Encapsulation" },
     { question: "Which feature is not in C++?", options: ["Classes", "Inheritance", "Garbage Collection", "Polymorphism"], answer: "Garbage Collection" },
  { question: "Which operator is used for scope resolution?", options: ["::", "->", ":", "."], answer: "::" },
  { question: "Which STL container is ordered and unique?", options: ["vector", "set", "list", "map"], answer: "set" },
  { question: "Which OOP concept allows function overloading?", options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], answer: "Polymorphism" },
  { question: "Which keyword is used to create objects dynamically?", options: ["malloc", "calloc", "new", "alloc"], answer: "new" },
  { question: "Which keyword is used to destroy objects created with new?", options: ["delete", "remove", "free", "dispose"], answer: "delete" },
  { question: "Which access specifier is default for class members?", options: ["public", "private", "protected", "friend"], answer: "private" },
  { question: "Which of these is not a type of constructor?", options: ["Default", "Copy", "Parameterized", "Virtual"], answer: "Virtual" },
  { question: "Which feature of OOP is achieved by 'virtual' keyword?", options: ["Abstraction", "Encapsulation", "Runtime Polymorphism", "Compile-time Polymorphism"], answer: "Runtime Polymorphism" },
  { question: "Which operator is overloaded by 'cout'?", options: ["<<", ">>", "+", "="], answer: "<<" },

  { question: "Which function is called automatically when object is destroyed?", options: ["Constructor", "Destructor", "Delete", "Finalize"], answer: "Destructor" },
  { question: "Which of these is not part of OOP?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"], answer: "Compilation" },
  { question: "Which keyword defines inheritance?", options: ["extends", "inherits", ":", "->"], answer: ":" },
  { question: "Which container allows duplicate elements in C++?", options: ["set", "multiset", "map", "unordered_set"], answer: "multiset" },
  { question: "Which function must be overridden in abstract class?", options: ["Virtual function", "Constructor", "Destructor", "Inline"], answer: "Virtual function" },
  { question: "Which feature allows reusability of code?", options: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"], answer: "Inheritance" },
  { question: "Which operator cannot be overloaded?", options: ["+", "=", "::", "[]"], answer: "::" },
  { question: "Which keyword is used to declare constant members?", options: ["static", "const", "final", "immutable"], answer: "const" },
  { question: "Which type of casting is safe in C++?", options: ["static_cast", "dynamic_cast", "const_cast", "reinterpret_cast"], answer: "dynamic_cast" },
  { question: "Which C++ feature provides data hiding?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Overloading"], answer: "Encapsulation" },

  { question: "Which C++ feature allows multiple functions with same name?", options: ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"], answer: "Polymorphism" },
  { question: "Which operator is used to access members via pointer?", options: ["->", ".", "&", "*"], answer: "->" },
  { question: "Which container allows key-value pair storage?", options: ["map", "set", "vector", "stack"], answer: "map" },
  { question: "Which operator is used to dereference pointer?", options: ["*", "&", "->", "::"], answer: "*" },
  { question: "Which keyword is used for exception handling?", options: ["try", "catch", "throw", "All of the above"], answer: "All of the above" },
  { question: "Which keyword is used to define template function?", options: ["template", "function", "generic", "typename"], answer: "template" },
  { question: "Which of these is not a valid C++ data type?", options: ["int", "float", "boolean", "double"], answer: "boolean" },
  { question: "Which STL container works as LIFO?", options: ["queue", "stack", "list", "vector"], answer: "stack" },
  { question: "Which STL container works as FIFO?", options: ["queue", "stack", "list", "vector"], answer: "queue" },
  { question: "Which function is used to handle file input?", options: ["ifstream", "ofstream", "fstream", "all"], answer: "ifstream" },

  { question: "Which function is used to handle file output?", options: ["ifstream", "ofstream", "fstream", "all"], answer: "ofstream" },
  { question: "Which keyword is used for inline function?", options: ["inline", "fast", "immediate", "const"], answer: "inline" },
  { question: "Which is not a C++ loop?", options: ["for", "while", "do-while", "loop"], answer: "loop" },
  { question: "Which is the ternary operator in C++?", options: ["?", ":", "??", "->"], answer: "?" },
  { question: "Which operator is used for bitwise AND?", options: ["&", "|", "^", "~"], answer: "&" },
  { question: "Which keyword is used to declare abstract class?", options: ["abstract", "virtual", "interface", "none"], answer: "virtual" },
  { question: "Which is used for dynamic polymorphism?", options: ["virtual function", "friend function", "inline function", "constructor"], answer: "virtual function" },
  { question: "Which header file is required for I/O operations?", options: ["<iostream>", "<fstream>", "<iomanip>", "<conio.h>"], answer: "<iostream>" },
  { question: "Which operator is used for pointer to member access?", options: ["->*", ".*", ".", "->"], answer: "->*" },
  { question: "Which function is used to read a line from file?", options: ["getline()", "readline()", "get()", "fgets()"], answer: "getline()" },

  // 41
  { question: "Which keyword is used to prevent inheritance?", options: ["final", "sealed", "const", "immutable"], answer: "final" },
  { question: "Which function is used to read/write binary files?", options: ["read()", "write()", "both", "none"], answer: "both" },
  { question: "Which container allows fast insertion/deletion at both ends?", options: ["deque", "vector", "list", "stack"], answer: "deque" },
  { question: "Which container is dynamic array in STL?", options: ["vector", "deque", "list", "array"], answer: "vector" },
  { question: "Which function returns size of container?", options: ["size()", "length()", "count()", "sizeof()"], answer: "size()" },
  { question: "Which function checks if container is empty?", options: ["empty()", "isEmpty()", "isempty()", "null()"], answer: "empty()" },
  { question: "Which function inserts element at end in vector?", options: ["push_back()", "push_front()", "insert()", "append()"], answer: "push_back()" },
  { question: "Which container allows random access?", options: ["vector", "list", "deque", "stack"], answer: "vector" },
  { question: "Which container is doubly linked list?", options: ["vector", "list", "deque", "stack"], answer: "list" },

  // 51
  { question: "Which STL function removes last element?", options: ["pop_back()", "pop_front()", "remove()", "delete()"], answer: "pop_back()" },
  { question: "Which STL function adds element at front in deque?", options: ["push_back()", "push_front()", "insert()", "append()"], answer: "push_front()" },
  { question: "Which keyword is used for operator overloading?", options: ["operator", "overload", "function", "over"], answer: "operator" },
  { question: "Which is used to define macro?", options: ["#define", "#macro", "#const", "#include"], answer: "#define" },
  { question: "Which is preprocessor directive?", options: ["#include", "#import", "#using", "#define"], answer: "#include" },
  { question: "Which function is used to copy string?", options: ["strcpy()", "strcopy()", "copy()", "strcopytext()"], answer: "strcpy()" },
  { question: "Which function compares two strings?", options: ["strcmp()", "compare()", "strcompare()", "check()"], answer: "strcmp()" },
  { question: "Which function concatenates two strings?", options: ["strcat()", "concat()", "append()", "strappend()"], answer: "strcat()" },
  { question: "Which is not a valid C++ storage class?", options: ["auto", "register", "static", "variable"], answer: "variable" },

  // 61
  { question: "Which keyword allows compile-time polymorphism?", options: ["virtual", "overload", "template", "inline"], answer: "overload" },
  { question: "Which operator is used for modulo operation?", options: ["%", "/", "*", "^"], answer: "%" },
  { question: "Which header file is required for math functions?", options: ["<cmath>", "<math.h>", "<cstdlib>", "<cstdio>"], answer: "<cmath>" },
  { question: "Which keyword is used to define a namespace?", options: ["namespace", "using", "package", "module"], answer: "namespace" },
  { question: "Which operator is used to access global variables inside a class?", options: ["::", "->", ".", "&"], answer: "::" },
  { question: "Which STL container maintains insertion order?", options: ["vector", "list", "deque", "map"], answer: "list" },
  { question: "Which function is used to open a file?", options: ["open()", "fopen()", "fileOpen()", "initFile()"], answer: "open()" },
  { question: "Which keyword prevents a member function from being overridden?", options: ["final", "sealed", "const", "override"], answer: "final" },
  { question: "Which is the correct way to define a default constructor?", options: ["ClassName() {}", "void ClassName() {}", "ClassName(void) return {}", "ClassName{}"], answer: "ClassName() {}" },
  { question: "Which function is used to check end-of-file?", options: ["eof()", "end()", "isEnd()", "fileEnd()"], answer: "eof()" },
  { question: "Which keyword is used to create a type alias?", options: ["typedef", "using", "alias", "type"], answer: "typedef" },
  { question: "Which function is used to sort elements in STL container?", options: ["sort()", "order()", "arrange()", "sorted()"], answer: "sort()" },
  { question: "Which container provides O(1) access at both ends?", options: ["deque", "vector", "list", "stack"], answer: "deque" },

  { question: "Which header file is required for strings in C++?", options: ["<string>", "<cstring>", "<iostream>", "<sstream>"], answer: "<string>" },
  { question: "Which function is used to insert element at specific position in vector?", options: ["insert()", "push_back()", "append()", "add()"], answer: "insert()" },
  { question: "Which keyword is used to make a member function inline?", options: ["inline", "fast", "const", "immediate"], answer: "inline" },
  { question: "Which operator is used to access private members from friend function?", options: ["->", ".", "::", "access"], answer: "->" },
  { question: "Which container allows duplicate keys?", options: ["multimap", "map", "set", "unordered_map"], answer: "multimap" },
  { question: "Which exception class is used for standard exceptions?", options: ["std::exception", "std::error", "std::catch", "std::throw"], answer: "std::exception" },
  { question: "Which keyword is used to define a constant expression?", options: ["constexpr", "const", "constant", "final"], answer: "constexpr" },
  { question: "Which header file is required for dynamic memory allocation?", options: ["<cstdlib>", "<malloc.h>", "<new>", "<memory>"], answer: "<new>" },
  { question: "Which loop is used when number of iterations is known?", options: ["for", "while", "do-while", "foreach"], answer: "for" },
  { question: "Which keyword is used to create alias for template parameter?", options: ["typename", "template", "class", "type"], answer: "typename" },

  { question: "Which operator is used to access element of array?", options: ["[]", "*", "&", "."], answer: "[]" },
  { question: "Which function is used to remove last element from vector?", options: ["pop_back()", "erase()", "remove()", "delete()"], answer: "pop_back()" },
  { question: "Which keyword is used to inherit publicly?", options: ["public", "private", "protected", "friend"], answer: "public" },
  { question: "Which function is used to read formatted input from file?", options: ["ifstream >>", "read()", "get()", "fscanf()"], answer: "ifstream >>" },
  { question: "Which STL container stores elements in contiguous memory?", options: ["vector", "list", "deque", "map"], answer: "vector" }
  ],

  "Java": [
    { question: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "super"], answer: "extends" },
    { question: "Which method starts a Java program?", options: ["run()", "main()", "start()", "init()"], answer: "main()" },
    { question: "Which collection allows duplicate elements?", options: ["Set", "Map", "List", "Tree"], answer: "List" },
    { question: "Which keyword is used to stop loop?", options: ["stop", "exit", "break", "halt"], answer: "break" },
    { question: "Which of these is not OOP concept in Java?", options: ["Polymorphism", "Encapsulation", "Compilation", "Inheritance"], answer: "Compilation" },
    { question: "Which keyword is used to prevent inheritance?", options: ["stop", "final", "static", "private"], answer: "final" },
    { question: "Which collection stores unique elements?", options: ["List", "Set", "Map", "Queue"], answer: "Set" },
    { question: "Which exception is checked?", options: ["RuntimeException", "IOException", "NullPointerException", "ArithmeticException"], answer: "IOException" },
    { question: "Which package is default in Java?", options: ["java.io", "java.util", "java.lang", "none"], answer: "java.lang" },
    { question: "Which keyword is used to implement interfaces?", options: ["extends", "interface", "implements", "inherits"], answer: "implements" },
    { question: "Which method is used to start threads?", options: ["run()", "start()", "execute()", "launch()"], answer: "start()" },
    { question: "Which type of variable belongs to the class, not instance?", options: ["local", "instance", "static", "final"], answer: "static" },
    { question: "Which collection is FIFO?", options: ["Stack", "Queue", "Set", "List"], answer: "Queue" },
    { question: "Which keyword is used for garbage collection?", options: ["free", "delete", "gc", "none"], answer: "none" },
    { question: "Which Java keyword is used for multiple inheritance?", options: ["extends", "interface", "implements", "super"], answer: "interface" },
    { question: "Which operator is used for object comparison?", options: ["==", "equals()", "compare()", "compareTo()"], answer: "equals()" },
    { question: "Which type of class cannot be instantiated?", options: ["abstract", "final", "static", "public"], answer: "abstract" },
    { question: "Which method is used for cleanup before GC?", options: ["dispose()", "finalize()", "delete()", "clear()"], answer: "finalize()" },
    { question: "Which collection class is synchronized?", options: ["ArrayList", "Vector", "HashSet", "HashMap"], answer: "Vector" },
    { question: "Which access specifier allows visibility in package only?", options: ["public", "protected", "private", "default"], answer: "default" },
    
  // 21
  { question: "Which keyword is used to access parent class members?", options: ["this", "parent", "super", "base"], answer: "super" },
  { question: "Which method is called automatically during object creation?", options: ["main()", "create()", "constructor", "init()"], answer: "constructor" },
  { question: "Which Java feature allows method overloading?", options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], answer: "Polymorphism" },
  { question: "Which collection does not allow duplicate elements?", options: ["List", "Set", "Queue", "ArrayList"], answer: "Set" },
  { question: "Which operator is used for string concatenation?", options: ["+", "&", "concat()", "*"], answer: "+" },
  { question: "Which keyword is used to create an object?", options: ["class", "new", "create", "object"], answer: "new" },
  { question: "Which loop is guaranteed to run at least once?", options: ["for", "while", "do-while", "foreach"], answer: "do-while" },
  { question: "Which exception occurs when array index is invalid?", options: ["ArrayIndexOutOfBoundsException", "NullPointerException", "IOException", "RuntimeException"], answer: "ArrayIndexOutOfBoundsException" },
  { question: "Which collection provides key-value mapping?", options: ["Set", "List", "Map", "Queue"], answer: "Map" },
  { question: "Which method is used to compare two strings?", options: ["compare()", "equals()", "==", "match()"], answer: "equals()" },

  // 31
  { question: "Which keyword is used to inherit interfaces?", options: ["extends", "implements", "inherits", "super"], answer: "implements" },
  { question: "Which Java concept provides data hiding?", options: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"], answer: "Encapsulation" },
  { question: "Which exception occurs when dividing by zero?", options: ["IOException", "ArithmeticException", "NullPointerException", "Exception"], answer: "ArithmeticException" },
  { question: "Which method is entry point of Java applet?", options: ["run()", "main()", "init()", "start()"], answer: "init()" },
  { question: "Which modifier is used for constants?", options: ["const", "final", "static", "immutable"], answer: "final" },
  { question: "Which keyword is used to handle exceptions?", options: ["error", "try", "catch", "try-catch"], answer: "try-catch" },
  { question: "Which package contains collection framework?", options: ["java.io", "java.sql", "java.util", "java.lang"], answer: "java.util" },
  { question: "Which method converts string to integer?", options: ["Integer.parseInt()", "toInt()", "convert()", "parseInt()"], answer: "Integer.parseInt()" },
  { question: "Which thread method is used to pause execution?", options: ["sleep()", "wait()", "pause()", "stop()"], answer: "sleep()" },
  { question: "Which collection maintains insertion order?", options: ["HashSet", "LinkedHashSet", "TreeSet", "Vector"], answer: "LinkedHashSet" },

  // 41
  { question: "Which keyword is used to declare abstract methods?", options: ["abstract", "interface", "virtual", "final"], answer: "abstract" },
  { question: "Which Java operator checks equality?", options: ["==", "equals()", "is", "==="], answer: "==" },
  { question: "Which interface is implemented by all collection classes?", options: ["Collection", "Iterable", "List", "Map"], answer: "Iterable" },
  { question: "Which Java collection sorts elements naturally?", options: ["HashSet", "TreeSet", "LinkedList", "ArrayList"], answer: "TreeSet" },
  { question: "Which keyword is used to define packages?", options: ["namespace", "package", "import", "module"], answer: "package" },
  { question: "Which keyword is used to import classes?", options: ["use", "include", "import", "package"], answer: "import" },
  { question: "Which collection is synchronized?", options: ["ArrayList", "Vector", "HashMap", "HashSet"], answer: "Vector" },
  { question: "Which class is superclass of all Java classes?", options: ["Object", "Base", "Super", "Root"], answer: "Object" },
  { question: "Which method is used to get length of array?", options: ["length", "size()", "count()", "getLength()"], answer: "length" },
  { question: "Which exception is thrown when object is null?", options: ["IOException", "NullPointerException", "ArithmeticException", "RuntimeException"], answer: "NullPointerException" },

  // 51
  { question: "Which keyword is used for multiple catch blocks?", options: ["finally", "throw", "multi", "catch"], answer: "catch" },
  { question: "Which class is used for reading input?", options: ["Scanner", "Input", "Reader", "Buffer"], answer: "Scanner" },
  { question: "Which method is used to terminate thread?", options: ["stop()", "kill()", "exit()", "terminate()"], answer: "stop()" },
  { question: "Which Java keyword is used to create threads?", options: ["thread", "synchronized", "extends Thread", "Runnable"], answer: "extends Thread" },
  { question: "Which collection provides last-in first-out?", options: ["Queue", "Stack", "List", "Set"], answer: "Stack" },
  { question: "Which method is called before object destruction?", options: ["clear()", "finalize()", "dispose()", "close()"], answer: "finalize()" },
  { question: "Which Java class is immutable?", options: ["String", "StringBuilder", "ArrayList", "Vector"], answer: "String" },
  { question: "Which operator is used for bitwise AND?", options: ["&", "|", "&&", "^"], answer: "&" },
  { question: "Which keyword makes variable belong to class?", options: ["final", "this", "static", "super"], answer: "static" },
  { question: "Which exception occurs in type casting?", options: ["IOException", "ClassCastException", "RuntimeException", "IllegalCast"], answer: "ClassCastException" },

  // 61
  { question: "Which Java feature ensures security?", options: ["JVM sandbox", "Garbage collection", "Encapsulation", "All of these"], answer: "All of these" },
  { question: "Which method is used to notify waiting thread?", options: ["notify()", "resume()", "wake()", "start()"], answer: "notify()" },
  { question: "Which keyword is used to throw exception?", options: ["error", "throw", "throws", "catch"], answer: "throw" },
  { question: "Which keyword is used to declare interface?", options: ["interface", "implements", "abstract", "module"], answer: "interface" },
  { question: "Which collection does not guarantee order?", options: ["ArrayList", "LinkedList", "HashSet", "TreeSet"], answer: "HashSet" },
  { question: "Which keyword is used to stop thread execution?", options: ["stop", "exit", "kill", "none"], answer: "stop" },
  { question: "Which method is called for object comparison?", options: ["compareTo()", "equals()", "==", "compare()"], answer: "compareTo()" },
  { question: "Which collection allows key-value pairs?", options: ["Map", "Set", "List", "Queue"], answer: "Map" },
  { question: "Which Java version introduced lambda?", options: ["Java 6", "Java 7", "Java 8", "Java 11"], answer: "Java 8" },
  { question: "Which functional interface is used for lambda?", options: ["Runnable", "Callable", "Functional", "Predicate"], answer: "Predicate" },

  // 71
  { question: "Which keyword is used with generics?", options: ["< > brackets", "generic", "template", "type"], answer: "< > brackets" },
  { question: "Which stream is used for binary files?", options: ["FileReader", "FileWriter", "FileInputStream", "BufferedReader"], answer: "FileInputStream" },
  { question: "Which Java collection is best for searching?", options: ["HashMap", "ArrayList", "LinkedList", "Vector"], answer: "HashMap" },
  { question: "Which keyword is used for synchronization?", options: ["synchronized", "lock", "sync", "threadsafe"], answer: "synchronized" },
  { question: "Which keyword prevents overriding?", options: ["final", "private", "abstract", "static"], answer: "final" },
  { question: "Which operator is used for ternary operation?", options: ["?", ":", "??", "=>"], answer: "?" },
  { question: "Which keyword is used to check object type?", options: ["is", "as", "instanceof", "typeof"], answer: "instanceof" },
  { question: "Which method is used to convert int to string?", options: ["toString()", "String.valueOf()", "convert()", "parse()"], answer: "String.valueOf()" },
  { question: "Which stream is used for character files?", options: ["FileReader", "FileWriter", "FileInputStream", "PrintStream"], answer: "FileReader" },
  { question: "Which keyword is used to define enums?", options: ["enum", "enumeration", "list", "set"], answer: "enum" }
  ],

  "Python": [
    { question: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "lambda"], answer: "def" },
    { question: "Which method adds an item to a list?", options: ["add()", "append()", "insert()", "push()"], answer: "append()" },
    { question: "Which data type is immutable?", options: ["list", "dict", "set", "tuple"], answer: "tuple" },
    { question: "Which keyword is used to create a class?", options: ["class", "object", "def", "struct"], answer: "class" },
    { question: "Which is the correct file extension for Python?", options: [".pyt", ".pt", ".py", ".python"], answer: ".py" },
    { question: "Which function gives length of list?", options: ["len()", "length()", "size()", "count()"], answer: "len()" },
    { question: "Which statement is used to handle exceptions?", options: ["try-except", "if-else", "throw", "catch"], answer: "try-except" },
    { question: "Which module is used for regular expressions?", options: ["re", "regex", "regexp", "match"], answer: "re" },
    { question: "Which keyword is used for inheritance?", options: ["extends", "inherits", "super", "class"], answer: "class" },
    { question: "Which collection type stores key-value pairs?", options: ["list", "tuple", "dict", "set"], answer: "dict" },
    { question: "Which keyword is used for anonymous function?", options: ["def", "lambda", "func", "anon"], answer: "lambda" },
    { question: "Which function is used to take input from user?", options: ["scan()", "read()", "input()", "get()"], answer: "input()" },
    { question: "Which operator is used for exponentiation?", options: ["^", "**", "pow", "exp"], answer: "**" },
    { question: "Which data type is unordered?", options: ["list", "tuple", "set", "string"], answer: "set" },
    { question: "Which keyword defines generator function?", options: ["yield", "return", "def", "gen"], answer: "yield" },
    { question: "Which keyword makes a variable global inside function?", options: ["static", "global", "public", "var"], answer: "global" },
    { question: "Which module is used for mathematical operations?", options: ["math", "cmath", "num", "calc"], answer: "math" },
    { question: "Which keyword exits loop prematurely?", options: ["stop", "exit", "break", "end"], answer: "break" },
    { question: "Which function converts string to integer?", options: ["str()", "toInt()", "int()", "parseInt()"], answer: "int()" },
    { question: "Which collection type allows duplicate elements?", options: ["set", "dict", "list", "none"], answer: "list" },
    
  // 21
  { question: "Which method removes last element from a list?", options: ["remove()", "delete()", "pop()", "discard()"], answer: "pop()" },
  { question: "Which operator is used for floor division?", options: ["/", "//", "%", "**"], answer: "//" },
  { question: "Which keyword is used to handle exceptions?", options: ["catch", "except", "throw", "error"], answer: "except" },
  { question: "Which function returns absolute value?", options: ["fabs()", "absolute()", "abs()", "mod()"], answer: "abs()" },
  { question: "Which keyword is used to continue loop?", options: ["next", "skip", "continue", "pass"], answer: "continue" },
  { question: "Which built-in type is a sequence?", options: ["list", "tuple", "string", "all of these"], answer: "all of these" },
  { question: "Which keyword is used to import modules?", options: ["include", "import", "use", "require"], answer: "import" },
  { question: "Which method converts list into set?", options: ["set()", "toSet()", "list.set()", "convert()"], answer: "set()" },
  { question: "Which function returns type of variable?", options: ["typeof()", "instance()", "type()", "class()"], answer: "type()" },
  { question: "Which function is used to sort a list?", options: ["order()", "sorted()", "arrange()", "sort()"], answer: "sorted()" },

  // 31
  { question: "Which keyword creates an empty block?", options: ["skip", "continue", "pass", "empty"], answer: "pass" },
  { question: "Which function returns max value?", options: ["maximum()", "max()", "highest()", "top()"], answer: "max()" },
  { question: "Which keyword is used to delete variables?", options: ["delete", "remove", "del", "clear"], answer: "del" },
  { question: "Which function gives ASCII of char?", options: ["ord()", "ascii()", "charCode()", "code()"], answer: "ord()" },
  { question: "Which function converts int to binary?", options: ["bin()", "binary()", "int.bin()", "toBinary()"], answer: "bin()" },
  { question: "Which module is used for random numbers?", options: ["math", "random", "numbers", "rand"], answer: "random" },
  { question: "Which keyword is used in list comprehension?", options: ["foreach", "for", "loop", "map"], answer: "for" },
  { question: "Which function is used to open files?", options: ["file()", "open()", "read()", "with()"], answer: "open()" },
  { question: "Which keyword ensures file close automatically?", options: ["using", "with", "auto", "close"], answer: "with" },
  { question: "Which mode is used to write in file?", options: ["r", "rw", "w", "x"], answer: "w" },

  // 41
  { question: "Which module is used for JSON in Python?", options: ["json", "pickle", "marshal", "data"], answer: "json" },
  { question: "Which function returns length of string?", options: ["length()", "len()", "count()", "size()"], answer: "len()" },
  { question: "Which function is used to read input as int?", options: ["int(input())", "inputInt()", "toInt()", "scanInt()"], answer: "int(input())" },
  { question: "Which keyword is used for multiple inheritance?", options: ["multi", "super", "class", "none"], answer: "class" },
  { question: "Which method is constructor in Python?", options: ["constructor()", "init()", "__init__()", "create()"], answer: "__init__()" },
  { question: "Which function converts string to list?", options: ["split()", "list()", "array()", "divide()"], answer: "list()" },
  { question: "Which loop is used to iterate sequence?", options: ["for", "while", "do-while", "foreach"], answer: "for" },
  { question: "Which function returns smallest value?", options: ["min()", "small()", "least()", "lower()"], answer: "min()" },
  { question: "Which statement is used for documentation?", options: ["// comment", "/* comment */", "# comment", '"""docstring"""'], answer: '"""docstring"""' },
  { question: "Which module is used for date & time?", options: ["calendar", "datetime", "time", "all of these"], answer: "all of these" },

  // 51
  { question: "Which function converts object to string?", options: ["toString()", "str()", "string()", "repr()"], answer: "str()" },
  { question: "Which keyword is used with decorators?", options: ["@", "#", "$", "&"], answer: "@" },
  { question: "Which module is used to copy objects?", options: ["os", "shutil", "copy", "pickle"], answer: "copy" },
  { question: "Which method returns dictionary keys?", options: ["getKeys()", "dict.keys()", "keys()", "allKeys()"], answer: "keys()" },
  { question: "Which Python keyword creates iterator?", options: ["iter", "next", "yield", "generator"], answer: "yield" },
  { question: "Which module is used to handle CSV?", options: ["csv", "pandas", "data", "excel"], answer: "csv" },
  { question: "Which library is best for data analysis?", options: ["numpy", "pandas", "scipy", "math"], answer: "pandas" },
  { question: "Which function returns sum of list?", options: ["sum()", "total()", "add()", "reduce()"], answer: "sum()" },
  { question: "Which function rounds numbers?", options: ["round()", "approx()", "floor()", "ceil()"], answer: "round()" },
  { question: "Which operator is used for membership?", options: ["in", "has", "contains", "is"], answer: "in" },

  // 61
  { question: "Which operator checks identity?", options: ["==", "is", "equals", "==="], answer: "is" },
  { question: "Which module is used for OS operations?", options: ["os", "sys", "platform", "path"], answer: "os" },
  { question: "Which module handles command line args?", options: ["sys", "os", "cmd", "arg"], answer: "sys" },
  { question: "Which function is used to get help?", options: ["doc()", "help()", "info()", "about()"], answer: "help()" },
  { question: "Which keyword is used to stop function?", options: ["return", "break", "stop", "end"], answer: "return" },
  { question: "Which keyword creates generator?", options: ["gen", "yield", "def", "return"], answer: "yield" },
  { question: "Which library is used for numerical computing?", options: ["numpy", "pandas", "math", "scipy"], answer: "numpy" },
  { question: "Which operator is logical AND?", options: ["and", "&", "&&", "all"], answer: "and" },
  { question: "Which operator is logical OR?", options: ["or", "||", "|", "any"], answer: "or" },
  { question: "Which operator is logical NOT?", options: ["!", "not", "~", "none"], answer: "not" },

  // 71
  { question: "Which module handles serialization?", options: ["pickle", "json", "marshal", "all of these"], answer: "all of these" },
  { question: "Which function converts hex to int?", options: ["int(x,16)", "hexInt()", "toInt()", "parseHex()"], answer: "int(x,16)" },
  { question: "Which function generates range of numbers?", options: ["series()", "range()", "numbers()", "list()"], answer: "range()" },
  { question: "Which keyword defines async function?", options: ["async", "await", "def", "parallel"], answer: "async" },
  { question: "Which keyword waits for async?", options: ["wait", "await", "stop", "pause"], answer: "await" },
  { question: "Which method adds element in set?", options: ["add()", "append()", "insert()", "push()"], answer: "add()" },
  { question: "Which method removes specific element from set?", options: ["delete()", "remove()", "discard()", "pop()"], answer: "remove()" },
  { question: "Which function gives unique elements of list?", options: ["set()", "unique()", "distinct()", "filter()"], answer: "set()" },
  { question: "Which function gives power of number?", options: ["pow()", "power()", "exp()", "**"], answer: "pow()" },
  { question: "Which function gives quotient & remainder?", options: ["divide()", "mod()", "divmod()", "split()"], answer: "divmod()" },

  // 81
  { question: "Which statement is used to exit program?", options: ["exit()", "quit()", "sys.exit()", "all of these"], answer: "all of these" },
  { question: "Which module is used for HTTP requests?", options: ["http", "socket", "urllib", "requests"], answer: "requests" },
  { question: "Which module is used for GUI in Python?", options: ["tkinter", "pygame", "pyqt", "all of these"], answer: "all of these" },
  { question: "Which keyword defines class method?", options: ["classmethod", "static", "class", "@classmethod"], answer: "@classmethod" },
  { question: "Which keyword defines static method?", options: ["static", "@staticmethod", "method", "def static"], answer: "@staticmethod" },
  { question: "Which library is used for ML in Python?", options: ["pandas", "numpy", "scikit-learn", "matplotlib"], answer: "scikit-learn" },
  { question: "Which library is used for visualization?", options: ["numpy", "matplotlib", "pandas", "scipy"], answer: "matplotlib" },
  { question: "Which library is used for deep learning?", options: ["tensorflow", "pytorch", "keras", "all of these"], answer: "all of these" },
  { question: "Which library is used for database in Python?", options: ["sqlite3", "mysql", "psycopg2", "all of these"], answer: "all of these" },
  { question: "Which keyword is used to define private variable?", options: ["_", "__", "private", "hidden"], answer: "__" }
  ],
  "Django": [

  { 
    question: "Which command is used to start a new Django project?", 
    options: ["django-admin startapp", "django-admin startproject", "python manage.py runserver", "django create project"], 
    answer: "django-admin startproject" 
  },
  { 
    question: "Which file contains Django project settings?", 
    options: ["views.py", "urls.py", "settings.py", "models.py"], 
    answer: "settings.py" 
  },
  { 
    question: "What is the default database used by Django?", 
    options: ["MySQL", "PostgreSQL", "SQLite", "Oracle"], 
    answer: "SQLite" 
  },
  { 
    question: "Which file is used for URL routing in Django?", 
    options: ["views.py", "models.py", "urls.py", "settings.py"], 
    answer: "urls.py" 
  },
  { 
    question: "Which ORM does Django use?", 
    options: ["SQLAlchemy", "Hibernate", "Django ORM", "Peewee"], 
    answer: "Django ORM" 
  },
  { 
    question: "Which command creates database tables for models?", 
    options: ["python manage.py makemigrations", "python manage.py migrate", "python manage.py createsuperuser", "python manage.py runserver"], 
    answer: "python manage.py migrate" 
  },
  { 
    question: "Which file defines Django models?", 
    options: ["views.py", "models.py", "urls.py", "settings.py"], 
    answer: "models.py" 
  },
  { 
    question: "Which Django feature helps prevent CSRF attacks?", 
    options: ["CSRF Token", "JWT", "Middleware", "OAuth"], 
    answer: "CSRF Token" 
  },
  { 
    question: "What is the default port of Django development server?", 
    options: ["3000", "5000", "8000", "8080"], 
    answer: "8000" 
  },
  { question: "What is Django?", options: ["Web Framework", "Programming Language", "Database", "IDE"], answer: "Web Framework" },

  // 2
  { question: "Django is written in which programming language?", options: ["C++", "Python", "Java", "PHP"], answer: "Python" },

  // 3
  { question: "Which architectural pattern does Django follow?", options: ["MVC", "MVT", "MVVM", "Layered"], answer: "MVT" },

  // 4
  { question: "What does MVT stand for in Django?", options: ["Model View Template", "Model View Tool", "Main View Template", "Model Variable Template"], answer: "Model View Template" },

  // 5
  { question: "Which command is used to start a new Django project?", options: ["django-admin startapp", "django-admin startproject", "python manage.py runserver", "django-admin init"], answer: "django-admin startproject" },

  // 6
  { question: "Which command is used to create a new Django app?", options: ["django-admin startproject", "django-admin startapp", "python manage.py createapp", "django-admin initapp"], answer: "django-admin startapp" },

  // 7
  { question: "Default database used by Django is?", options: ["MySQL", "PostgreSQL", "SQLite", "Oracle"], answer: "SQLite" },

  // 8
  { question: "Which file contains all project settings in Django?", options: ["urls.py", "views.py", "settings.py", "models.py"], answer: "settings.py" },

  // 9
  { question: "Which command runs the Django development server?", options: ["python manage.py makemigrations", "python manage.py runserver", "django-admin runserver", "python manage.py start"], answer: "python manage.py runserver" },

  // 10
  { question: "Which file in Django is responsible for URL mapping?", options: ["views.py", "urls.py", "settings.py", "models.py"], answer: "urls.py" },

  // 11
  { question: "Which of the following is NOT a Django template tag?", options: ["{% for %}", "{% if %}", "{% loop %}", "{% block %}"], answer: "{% loop %}" },

  // 12
  { question: "Which ORM does Django use?", options: ["Hibernate", "ActiveRecord", "Built-in ORM", "SQLAlchemy"], answer: "Built-in ORM" },

  // 13
  { question: "What is the default port of Django development server?", options: ["5000", "8080", "8000", "3000"], answer: "8000" },

  // 14
  { question: "Which command creates migrations for models?", options: ["python manage.py makemigrations", "python manage.py migrate", "python manage.py create", "python manage.py build"], answer: "python manage.py makemigrations" },

  // 15
  { question: "Which command applies migrations to the database?", options: ["python manage.py makemigrations", "python manage.py migrate", "python manage.py build", "python manage.py run"], answer: "python manage.py migrate" },

  // 16
  { question: "Which method is used in Django ORM to retrieve all records?", options: ["get()", "filter()", "all()", "select()"], answer: "all()" },

  // 17
  { question: "Which function is used to render HTML templates in Django views?", options: ["render()", "redirect()", "template()", "view()"], answer: "render()" },

  // 18
  { question: "Which decorator is used for function-based authentication views in Django?", options: ["@login_required", "@require_auth", "@auth", "@secure"], answer: "@login_required" },

  // 19
  { question: "Django follows which type of framework?", options: ["Asynchronous", "Synchronous", "Hybrid", "Microframework"], answer: "Synchronous" },

  // 20
  { question: "Which of the following is NOT a valid field in Django models?", options: ["CharField", "IntegerField", "DateField", "TextInputField"], answer: "TextInputField" },

  // 21
  { question: "Which Django command creates a superuser?", options: ["python manage.py createsuperuser", "python manage.py superuser", "django-admin adduser", "python manage.py inituser"], answer: "python manage.py createsuperuser" },

  // 22
  { question: "Which file registers models in Django admin?", options: ["views.py", "models.py", "admin.py", "urls.py"], answer: "admin.py" },

  // 23
  { question: "What is the default template engine in Django?", options: ["Jinja2", "Mako", "Django Template Engine", "Handlebars"], answer: "Django Template Engine" },

  // 24
  { question: "Which middleware provides CSRF protection in Django?", options: ["AuthenticationMiddleware", "SessionMiddleware", "CsrfViewMiddleware", "SecurityMiddleware"], answer: "CsrfViewMiddleware" },

  // 25
  { question: "Which file defines database configurations in Django?", options: ["models.py", "settings.py", "urls.py", "views.py"], answer: "settings.py" },

  // 26
  { question: "Which command collects static files in Django?", options: ["python manage.py collectstatic", "python manage.py makestatic", "python manage.py runstatic", "python manage.py buildstatic"], answer: "python manage.py collectstatic" },

  // 27
  { question: "Which class in Django is used to create forms?", options: ["DjangoForm", "forms.Form", "models.Form", "TemplateForm"], answer: "forms.Form" },

  // 28
  { question: "Which class is used to create Model-based forms?", options: ["forms.ModelForm", "forms.FormModel", "models.Form", "TemplateForm"], answer: "forms.ModelForm" },

  // 29
  { question: "What does manage.py file in Django do?", options: ["Helps in database setup", "Command-line utility for project management", "Stores migrations", "Handles HTML rendering"], answer: "Command-line utility for project management" },

  // 30
  { question: "Which file defines the installed apps in a Django project?", options: ["urls.py", "settings.py", "admin.py", "wsgi.py"], answer: "settings.py" },

  // 31
  { question: "Which Django view type automatically provides CRUD APIs?", options: ["Class Based Views", "Generic Views", "Function Based Views", "Middleware Views"], answer: "Generic Views" },

  // 32
  { question: "Which of the following is used to define a database model in Django?", options: ["class <name>(models.Model)", "def <name>(Model)", "function <name>()", "model <name>()"], answer: "class <name>(models.Model)" },

  // 33
  { question: "Which Django ORM method retrieves a single object?", options: ["all()", "get()", "filter()", "select()"], answer: "get()" },

  // 34
  { question: "Which ORM method returns a queryset matching condition?", options: ["all()", "filter()", "get()", "exclude()"], answer: "filter()" },

  // 35
  { question: "Which Django ORM method excludes specific records?", options: ["filter()", "all()", "exclude()", "get()"], answer: "exclude()" },

  // 36
  { question: "Which is the default primary key field in Django models?", options: ["AutoField", "IntegerField", "PrimaryKey", "BigAutoField"], answer: "AutoField" },

  // 37
  { question: "What is the use of Django signals?", options: ["Send notifications", "Allow decoupled apps to get notified of actions", "Handle migrations", "Manage templates"], answer: "Allow decoupled apps to get notified of actions" },

  // 38
  { question: "Which Django setting is used for debugging?", options: ["DEBUG", "TEST", "DEV", "LOG"], answer: "DEBUG" },

  // 39
  { question: "What is the default port number of Django runserver?", options: ["3000", "8080", "5000", "8000"], answer: "8000" },

  // 40
  { question: "Which of these is a valid HTTP method in Django views?", options: ["GET", "POST", "PUT", "All of the above"], answer: "All of the above" },

  // 41
  { question: "Which decorator is used for caching views in Django?", options: ["@cache_page", "@cache", "@cached", "@view_cache"], answer: "@cache_page" },

  // 42
  { question: "Which Django module handles file uploads?", options: ["forms.FileField", "models.FileField", "forms.UploadField", "upload.File"], answer: "models.FileField" },

  // 43
  { question: "Which function is used to redirect in Django?", options: ["redirect()", "render()", "forward()", "goto()"], answer: "redirect()" },

  // 44
  { question: "Which of these is a session backend in Django?", options: ["Database", "Cache", "File-based", "All of the above"], answer: "All of the above" },

  // 45
  { question: "Which command clears Django cache?", options: ["python manage.py clearcache", "python manage.py cache", "python manage.py flush", "python manage.py reset"], answer: "python manage.py flush" },

  // 46
  { question: "What is the default template file extension in Django?", options: [".html", ".jinja", ".tpl", ".django"], answer: ".html" },

  // 47
  { question: "Which Django setting stores static file URL?", options: ["STATIC_URL", "MEDIA_URL", "TEMPLATE_URL", "APP_URL"], answer: "STATIC_URL" },

  // 48
  { question: "Which setting defines the root directory of static files?", options: ["STATIC_ROOT", "STATIC_URL", "MEDIA_ROOT", "BASE_DIR"], answer: "STATIC_ROOT" },

  // 49
  { question: "Which setting defines media file path in Django?", options: ["MEDIA_URL", "MEDIA_ROOT", "STATIC_URL", "APP_PATH"], answer: "MEDIA_ROOT" },

  // 50
  { question: "Which method is used to hash passwords in Django?", options: ["make_password()", "hash()", "encrypt()", "generate_password()"], answer: "make_password()" },

  // 51
  { question: "Which module provides authentication system in Django?", options: ["django.contrib.auth", "django.auth", "django.security", "django.contrib.admin"], answer: "django.contrib.auth" },

  // 52
  { question: "Which Django field is used for storing email addresses?", options: ["CharField", "EmailField", "TextField", "MailField"], answer: "EmailField" },

  // 53
  { question: "Which Django class provides user authentication?", options: ["AbstractUser", "UserAuth", "BaseUser", "DjangoUser"], answer: "AbstractUser" },

  // 54
  { question: "Which method checks if a user is authenticated in Django?", options: ["user.is_authenticated", "user.auth()", "user.is_auth()", "user.valid()"], answer: "user.is_authenticated" },

  // 55
  { question: "Which middleware manages sessions in Django?", options: ["SessionMiddleware", "AuthMiddleware", "CacheMiddleware", "SecurityMiddleware"], answer: "SessionMiddleware" },

  // 56
  { question: "Which decorator restricts access to staff users in Django?", options: ["@staff_only", "@staff_required", "@staff_member_required", "@admin_only"], answer: "@staff_member_required" },

  // 57
  { question: "Which ORM method updates records in Django?", options: ["update()", "save()", "modify()", "change()"], answer: "update()" },

  // 58
  { question: "Which command shows all database tables in Django?", options: ["python manage.py showmigrations", "python manage.py dbshell", "python manage.py inspectdb", "python manage.py sqlmigrate"], answer: "python manage.py inspectdb" },

  // 59
  { question: "Which command converts an existing database into models?", options: ["inspectdb", "dbshell", "makemodels", "convert"], answer: "inspectdb" },

  // 60
  { question: "Which function returns JSON response in Django?", options: ["JsonResponse()", "render()", "HttpResponse()", "response.json()"], answer: "JsonResponse()" },

  // 61
  { question: "Which Django setting allows only specific hosts?", options: ["ALLOWED_HOSTS", "HOSTS_ALLOWED", "ALLOWED_URLS", "PERMITTED_HOSTS"], answer: "ALLOWED_HOSTS" },

  // 62
  { question: "Which file is executed first when a Django project runs?", options: ["wsgi.py", "settings.py", "urls.py", "manage.py"], answer: "manage.py" },

  // 63
  { question: "Which method is used to save data in Django models?", options: ["insert()", "update()", "save()", "commit()"], answer: "save()" },

  // 64
  { question: "Which Django template filter converts string to lowercase?", options: ["lower", "tolower", "down", "small"], answer: "lower" },

  // 65
  { question: "Which Django ORM method deletes objects?", options: ["remove()", "delete()", "drop()", "destroy()"], answer: "delete()" },

  // 66
  { question: "Which command is used to check Django version?", options: ["django-admin --version", "python manage.py version", "django --ver", "check version"], answer: "django-admin --version" },

  // 67
  { question: "Which command lists all available Django commands?", options: ["python manage.py help", "python manage.py list", "django-admin commands", "help manage.py"], answer: "python manage.py help" },

  // 68
  { question: "Which Django ORM field stores True/False values?", options: ["BooleanField", "CharField", "IntegerField", "ChoiceField"], answer: "BooleanField" },

  // 69
  { question: "Which Django template filter returns string length?", options: ["len", "count", "length", "strlen"], answer: "length" },

  // 70
  { question: "Which Django ORM field is used for foreign key relationships?", options: ["ForeignKey", "OneToOneField", "ManyToManyField", "RelationField"], answer: "ForeignKey" },

  // 71
  { question: "Which Django ORM field is used for many-to-many relationships?", options: ["ManyToManyField", "ForeignKey", "RelationField", "MultipleKey"], answer: "ManyToManyField" },

  // 72
  { question: "Which Django ORM field is used for one-to-one relationships?", options: ["OneToOneField", "ForeignKey", "RelationField", "UniqueKey"], answer: "OneToOneField" },

  // 73
  { question: "Which Django ORM method checks if a record exists?", options: ["exists()", "check()", "available()", "find()"], answer: "exists()" },

  // 74
  { question: "Which command creates SQL for migrations?", options: ["sqlmigrate", "makemigrations", "inspectdb", "dbshell"], answer: "sqlmigrate" },

  // 75
  { question: "Which class is used to paginate querysets in Django?", options: ["Paginator", "PageManager", "PageSet", "QueryPaginator"], answer: "Paginator" },

  // 76
  { question: "Which template tag loads static files in Django?", options: ["{% static %}", "{% load static %}", "{% asset %}", "{% media %}"], answer: "{% load static %}" },

  // 77
  { question: "Which Django template tag is used for inheritance?", options: ["{% block %}", "{% extends %}", "{% include %}", "{% use %}"], answer: "{% extends %}" },

  // 78
  { question: "Which template tag defines placeholders for child templates?", options: ["{% block %}", "{% include %}", "{% section %}", "{% child %}"], answer: "{% block %}" },

  // 79
  { question: "Which template tag is used to include another template?", options: ["{% include %}", "{% import %}", "{% add %}", "{% use %}"], answer: "{% include %}" },

  // 80
  { question: "Which Django cache backend uses local memory?", options: ["LocMemCache", "DatabaseCache", "FileBasedCache", "RedisCache"], answer: "LocMemCache" },

  // 81
  { question: "Which Django cache backend uses file storage?", options: ["FileBasedCache", "LocMemCache", "DatabaseCache", "RedisCache"], answer: "FileBasedCache" },

  // 82
  { question: "Which command creates an empty migration file?", options: ["makemigrations --empty", "migrate --empty", "sqlmigrate --empty", "startapp --empty"], answer: "makemigrations --empty" },

  // 83
  { question: "Which ORM field stores auto-incrementing integers?", options: ["AutoField", "BigIntegerField", "IntegerField", "SerialField"], answer: "AutoField" },

  // 84
  { question: "Which ORM field stores large text data?", options: ["TextField", "CharField", "LongText", "StringField"], answer: "TextField" },

  // 85
  { question: "Which ORM field is used to store choices?", options: ["ChoiceField", "SelectField", "IntegerField", "CharField with choices"], answer: "CharField with choices" },
]
};


// Globals
let questions = [];
let currentIndex = 0;
let score = 0;
let quizStartTime = null;

// DOM elements
const quizLangEl = document.getElementById("quizLang");
const questionBox = document.getElementById("questionBox");

// ensure logged in
function requireLogin() {
  const email = localStorage.getItem(sessionKey);
  if (!email) {
    window.location.href = "index.html";
    return null;
  }
  return email;
}

// load selected language, setup questions and UI
function initQuiz() {
  const email = requireLogin();
  if (!email) return;

  const selectedLang = localStorage.getItem(selectedLangKey) || "C";
  quizLangEl.textContent = `Language: ${selectedLang}`;

  // load questions
  questions = (questionBank[selectedLang] || []).map(q => ({ ...q }));

  if (questions.length === 0) {
    questionBox.innerHTML = `<p class="text-danger">No questions available for ${selectedLang}</p>`;
    return;
  }

  currentIndex = 0;
  score = 0;
  quizStartTime = Date.now();

  loadCurrentQuestion();
}

// load question UI
function loadCurrentQuestion() {
  const q = questions[currentIndex];
  questionBox.innerHTML = `
    <div class="question-card">
      <h5>${currentIndex + 1}. ${q.question}</h5>
      <div id="opts" class="mt-3"></div>
    </div>
  `;

  const optsEl = document.getElementById("opts");
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary d-block w-100 my-2 text-start";
    btn.style.whiteSpace = "normal";
    btn.textContent = opt;
    btn.onclick = () => selectOption(btn, q.answer);
    optsEl.appendChild(btn);
  });
}

// select option
function selectOption(btn, correctAnswer) {
  const opts = btn.parentElement.querySelectorAll("button");
  opts.forEach(b => b.disabled = true);

  const chosen = btn.textContent;
  if (chosen === correctAnswer) {
    btn.classList.remove("btn-outline-primary");
    btn.classList.add("btn-success");
    score++;
  } else {
    btn.classList.remove("btn-outline-primary");
    btn.classList.add("btn-danger");
    opts.forEach(b => {
      if (b.textContent === correctAnswer) {
        b.classList.remove("btn-outline-primary");
        b.classList.add("btn-success");
      }
    });
  }
}

// Next question
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadCurrentQuestion();
  } else {
    finishQuiz();
  }
}

// finish quiz
function finishQuiz() {
  const email = requireLogin();
  if (!email) return;

  const totalTimeSec = Math.round((Date.now() - quizStartTime) / 1000);
  const totalQuestions = questions.length;
  const selectedLang = localStorage.getItem(selectedLangKey) || "C";

  const usersRaw = localStorage.getItem(usersKey);
  const users = usersRaw ? JSON.parse(usersRaw) : {};
  const user = users[email];
  if (!user) {
    alert("User not found.");
    localStorage.removeItem(sessionKey);
    window.location.href = "index.html";
    return;
  }

  const historyEntry = {
    language: selectedLang,
    score,
    total: totalQuestions,
    timeTakenSec: totalTimeSec,
    date: new Date().toISOString(),
    passed: score / Math.max(1, totalQuestions) >= 0.5
  };

  user.history = user.history || [];
  user.history.push(historyEntry);
  users[email] = user;
  localStorage.setItem(usersKey, JSON.stringify(users));

  localStorage.setItem(lastScoreKey, `${score} / ${totalQuestions}`);
  localStorage.setItem("qa_lastDetail", JSON.stringify(historyEntry));

  window.location.href = "result.html";
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  const email = requireLogin();
  if (!email) return;
  initQuiz();
});

window.nextQuestion = nextQuestion;

