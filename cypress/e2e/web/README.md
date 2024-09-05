# Planejamento dos Testes

## Funcionalidade: Registro de Cliente
Como um usuário  
Eu quero me registrar como um cliente  
Para que eu possa ter acesso a funcionalidades e serviços personalizados

### Cenário 01: Registro com Sucesso 
```gherkin
Dado que estou na página de registro de cliente  
E preencho todos os campos corretamente
Quando eu clico em "Register"
Então deve exibir a mensagem "Your registration completed"  
```

## Funcionalidade: Campos Obrigatorios
Como um PO  
Eu quero que o sistema retorne para o usuário os campos obrigatorio que estiverem vazios
Para que ele envie todos os campos corretamente

### Cenário 01: Campos Obrigatorios Vazios
```gherkin
Dado que o usuário não preencha os campos obrigatorios
Quando eu clico em "Register"
Então deve exibir a mensagem "[campo] is required"  
```



