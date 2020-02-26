# CookieJS
Cookie Library in Javascript

## Usage

#### Initalize
```
var cookie = new Cookie();

```
#### Create Cookie

```
cookie.set("username","Freedom");
```

#### Get Cookie

```
// Cookie Key 
cookie.username.key

// Cookie Value
cookie.username.value

```

#### Remove Cookie

```
cookie.remove();
```

#### Search Cookie

```
// String Search
cookie.get("username");

// Regex Search
cookie.get(/name$/);
```
