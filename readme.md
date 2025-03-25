# 🛡️ FIDO2 Playground com HTTPS Local

Este projeto permite testar o registro de credenciais FIDO2/WebAuthn localmente, com HTTPS e certificados válidos gerados via `mkcert`, usando Node.js e Express.

---

## ⚙️ Requisitos

- Node.js (v14+)
- Navegador compatível com WebAuthn (Chrome, Firefox, Edge…)
- Linux/macOS (ou WSL, com adaptações)
- `mkcert` para gerar certificados locais confiáveis

---

## 🚀 Como rodar o projeto

### 1. Redirecionar o domínio customizado para o localhost

Edite o arquivo `/etc/hosts`:

```bash
sudo nano /etc/hosts
```

Adicione:

```
127.0.0.1 <seuhos
```

Isso faz com que ao acessar <seuhost>, você acesse seu próprio servidor local.

---

### 2. Gerar e instalar certificados com mkcert

```
sudo apt install libnss3-tools

curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"

chmod +x mkcert-v*-linux-amd64

sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert

mkcert -install

mkcert <seuhost>
```

Isso vai gerar dois arquivos .pem

### 3. Instalar os pacotes necessários

```
npm install
```

### 4. Rodar o servidor com HTTPS

```
sudo node server.js
```

É necessário rodar com sudo pois o Node irá escutar na porta 443.
