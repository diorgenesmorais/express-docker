# POC - express in typescript with docker

- Consultar CEP

```sh
curl --location --request GET 'http://localhost:4000/cep?zipcode=54735200'
```

- Consultar LOGs (registro das consultas dos CEPs)

```sh
curl --location --request GET 'http://localhost:4000/logs'
```
