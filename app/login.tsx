import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput, Snackbar, Text } from "react-native-paper";
import { useSession } from "@/app/ctx";
import { useState } from "react";

export default function LoginScreen() {
  const { signIn, signUp } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [helpData, setHelpData] = useState({
    email: null,
    password: null,
  });
  const [possuiConta, setPossuiConta] = useState(true);

  const verifyFields = (text: string, name: string) => {
    setHelpData((v: any) => ({
      ...v,
      [name]: text.length === 0 ? "Campo obrigatório" : null,
    }));
  };

  const resetSenha = () => {
    if (email === "") {
      alert("Digite um email para recuperar a senha");
      return;
    } else {
      alert(`Email de recuperação de senha enviado para ${email}`);
    }
    {
      /* 
        try {
          await sendPasswordResetEmail(auth, email);
          alert("Email de recuperação de senha enviado");
        } catch (error: any) {
          console.log(error);
          alert("Falha ao enviar email de recuperação de senha: " + error.message);
        }
        */
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          {possuiConta ? "Login" : "Criar Conta"}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInput}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {possuiConta ? (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (email.length > 0 && password.length > 0) {
                setLoading(true);
                try {
                  await signIn(email, password);
                } catch (e) {
                  if (e.toString().indexOf("(auth/invalid-credential")) {
                    setMessage("Dados de usuário inválidos");
                  }
                }
                setLoading(false);
              } else {
                setMessage("Preencha todos os campos");
                verifyFields(email, "email");
                verifyFields(password, "password");
              }
            }}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (email.length > 0 && password.length > 0) {
                setLoading(true);
                try {
                  await signUp(email, password);
                } catch (e) {
                  console.log(e);
                }
                setLoading(false);
              } else {
                setMessage("Preencha todos os campos");
                verifyFields(email, "email");
                verifyFields(password, "password");
              }
            }}
          >
            <Text style={styles.text}>Criar Conta</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setPossuiConta(!possuiConta)}>
          <Text style={styles.switchText}>
            {possuiConta
              ? "Não possui uma conta? Criar conta"
              : "Já possui uma conta? Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetSenha()}>
          <Text style={styles.switchText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <Snackbar
          visible={message !== null}
          onDismiss={() => setMessage(null)}
          duration={4000}
        >
          {message}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 40,
    color: "#1A237E",
  },
  textInput: {
    height: 50,
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderColor: "#E8EAF6",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 25,
    fontSize: 16,
    color: "#3C4858",
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "#5C6BC0",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  switchText: {
    marginTop: 20,
    color: "#1A237E",
    fontSize: 16,
    fontWeight: "500",
  },
});
