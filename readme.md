# cryptography and digital signing

- recent version of tls = 1.3 = ssl = 3.0
- TLS uses hashing algorithms such as SHA2

## PKCS 1-15 - PUBLIC KEY CRYPTOGRAPHY STANDARS

- The PKCS standard is a set of standards called PKCS 1 to 15. These standards cover RSA encryption, RSA signature, password-based encryption, encrypted message syntax, private key information syntax, selected object category and attribute type, authentication request syntax, encryption token interface, personal information exchange syntax, and encrypted token information grammar.
- based on an asymmetric cryptographic algorithm
- Typical public key digital signature algorithms are RSA, DSA, and ECDSA.
- PKCS12 is password protected container format for other certificates

### about pcks

[https://www.encryptionconsulting.com/public-key-cryptography-standards/]()

### convert x.509 to pkcs

[https://www.ibm.com/docs/en/oala/1.3.7?topic=SSPFMY_1.3.7/com.ibm.scala.doc/config/iwa_cnf_lgsth_lfa_ssl_cpy_crts_t.html]()

### Read content of pkcs12 in php

```
<?php
$credentials = array();
$p12 = file_get_contents("privatekey.p12");
$password = 'notasecret';

openssl_pkcs12_read($p12, $credentials, $password);

print_r($credentials);
```

## steps to generate ssl/tls certificate using opensll

1. Generate a private key
    - `openssl genrsa -out key.pem`
2. Create a CSR (certificate signing request) using private key
    - `openssl req -new -key key.pem -out csr.pem`
3. Generate the SSL certification from CSR.
    - `openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`

## notes

- X509 is a standard for public key certificates
- PEM is a base 64 format for certificates. Alternative of DER.
- Pkcs12 is an encrypted container that contains the public key and private key combined in binary format.
