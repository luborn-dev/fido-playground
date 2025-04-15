function base64urlToBuffer(base64url) {
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;
}

function bufferToBase64url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function handleRegister() {
  const input = document.getElementById("registerInput").value;
  const output = document.getElementById("output");

  try {
    const parsed = JSON.parse(input);
    const opts = parsed.fidoRegistrationOptions || parsed;

    const publicKey = {
      ...opts,
      challenge: base64urlToBuffer(opts.challenge),
      user: {
        ...opts.user,
        id: base64urlToBuffer(opts.user.id),
      },
    };

    const credential = await navigator.credentials.create({ publicKey });

    console.log(credential);

    const response = {
      id: credential.id,
      rawId: bufferToBase64url(credential.rawId),
      type: credential.type,
      response: {
        attestationObject: bufferToBase64url(
          credential.response.attestationObject
        ),
        clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
      },
    };

    output.textContent = JSON.stringify(response, null, 2);
  } catch (err) {
    output.textContent = `Erro: ${err.message}`;
    console.error(err);
  }
}

async function handleLogin() {
  const input = document.getElementById("loginInput").value;
  const output = document.getElementById("output");

  try {
    const parsed = JSON.parse(input);

    if (!parsed.fidoChallenge || !parsed.rawId) {
      throw new Error("fidoChallenge ou rawId ausente no JSON");
    }

    const publicKey = {
      challenge: base64urlToBuffer(parsed.fidoChallenge),
      rpId: "openbanking.sandbox.api.pagseguro.com",
      allowCredentials: [
        {
          id: base64urlToBuffer(parsed.rawId),
          type: "public-key",
        },
      ],
      userVerification: "preferred",
    };

    console.log("PublicKeyRequest:", publicKey);

    const assertion = await navigator.credentials.get({ publicKey });

    const response = {
      id: assertion.id,
      rawId: bufferToBase64url(assertion.rawId),
      type: assertion.type,
      response: {
        authenticatorData: bufferToBase64url(assertion.response.authenticatorData),
        clientDataJSON: bufferToBase64url(assertion.response.clientDataJSON),
        signature: bufferToBase64url(assertion.response.signature),
        userHandle: assertion.response.userHandle
            ? bufferToBase64url(assertion.response.userHandle)
            : null,
      },
    };

    output.textContent = JSON.stringify(response, null, 2);
  } catch (err) {
    output.textContent = `Erro: ${err.message}`;
    console.error(err);
  }
}

