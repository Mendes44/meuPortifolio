# Reformulação do portfólio — análise preliminar

Data: 7 de setembro de 2026. Nenhum arquivo do site existente foi alterado.

## Escopo e evidências

O arquivo de briefing foi lido integralmente. Seus requisitos servem de referência para a proposta; a solicitação direta acrescenta os três sites desenvolvidos por Marcos. A listagem do GitHub foi percorrida nas três páginas, com 69 entradas, incluindo privadas e um fork. Isso é uma triagem do catálogo, não uma auditoria do código de todos os repositórios.

Foram consultados: perfil/README de Mendes44; demonstrações Chico do Peixe, Verdinho e Mesa Certa; README e estrutura de Chico-do-Peixe, verdinho-restaurante e Lab01-Linux-SSH; estrutura e pom.xml de gestaoAPI; index.html do portfólio local. O leitor web e a chamada HTTP local falharam; o navegador permitiu essas consultas. Uma tentativa posterior de consultar o catálogo dev-mendes e outros projetos excedeu o tempo limite. Não foi possível concluir essa parte da revisão.

## Seleção proposta

| Projeto                                                                       | Apresentação                                                                                    | Evidência e justificativa                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mesa Certa](https://reserva-mesas-app-xi.vercel.app/reservar/bistro-da-vila) | Destaque com demonstração; código privado                                                       | Interface de reserva em quatro etapas, data, horário, número de pessoas e consulta de reserva. A data inicial informou ausência de horários. Não foi criada reserva nem validado o fluxo completo. Arquitetura backend ainda precisa de inspeção.                |
| [Chico do Peixe](https://chico-do-peixe.vercel.app/)                          | Destaque frontend com demonstração e [código](https://github.com/Mendes44/Chico-do-Peixe)       | Navegação multipágina, cardápio, galeria, carrosséis com controles de pausa, contato e WhatsApp. README confirma Next.js 16, React 19, TypeScript, Tailwind CSS 4 e otimização de imagens.                                                                       |
| [Restaurante Verdinho](https://verdinho-restaurante.vercel.app/)              | Destaque frontend com demonstração e [código](https://github.com/Mendes44/verdinho-restaurante) | Páginas de unidades, cardápio, encomendas por WhatsApp e integração por link com Mesa Certa. README descreve consentimento para analytics e eventos. React e TypeScript documentados; confirmar Vinext versus Next.js no package.json antes de publicar a stack. |
| [gestaoAPI](https://github.com/Mendes44/gestaoAPI)                            | Candidato backend, código no GitHub; sem demo verificada                                        | pom.xml confirma Java 17, Spring Boot 3.2.1, Spring Web, JPA, H2, Lombok e validação. A descrição cita Angular e há pasta frontend. Falta README. Endpoints, autenticação, execução e estado do frontend ainda não foram validados.                              |
| [Lab01-Linux-SSH](https://github.com/Mendes44/Lab01-Linux-SSH)                | Destaque complementar de infraestrutura e segurança; GitHub                                     | README com laboratório Ubuntu/VirtualBox, SSH com chave ED25519, UFW, NAT, diagnóstico de rede e logs. Demonstração técnica documentada; não equivale a auditoria de segurança nem a experiência de produção.                                                    |

Critérios: aplicação prática, evidência verificável, apresentação acessível a recrutadores, documentação e diversidade técnica. Os sites demonstram aplicações voltadas a negócios; a API e o laboratório evitam limitar o portfólio a páginas institucionais. Não afirmar relação comercial, impacto financeiro ou métricas de clientes sem confirmação.

## Projetos de reserva e lacunas

- projeto-jogodexadrez: candidato acadêmico Java/OO; descrição pública cita encapsulamento, herança, exceções e composição. Revisar implementação e execução antes de confirmar destaque.
- ContractPaymentAutomation: candidato de regras de negócio Java; descrição e perfil mencionam processamento de contratos. Não afirmar integração real com provedor de pagamento sem verificar o código.
- car-park, programPedidos e LendoeEscrevendoCsv: candidatos complementares; não promovidos a destaque sem inspeção mais profunda.
- Jogos e exercícios básicos podem ficar fora da primeira seleção por sobreposição de competências; isso não é julgamento de qualidade do código.
- Não usar o fork dio-lab-open-source como prova de autoria de uma aplicação de análise de dados.
- Não preencher todas as categorias à força. Python/análise de dados e automação ainda precisam de projetos suficientemente verificados.
- gestaoAPI precisa documentar instalação, H2, endpoints, exemplos, erros, estado do frontend e testes antes de ser apresentada como principal case backend.
- Mesa Certa precisa de verificação com disponibilidade e ambiente de testes; manter código privado, sem botão público de repositório.
- O perfil público registra formação em ADS na Cruzeiro do Sul e certificação AWS Cloud Practitioner. Validar datas e trajetória no currículo antes de compor a seção profissional.

## Diagnóstico local

O site atual é HTML/CSS. Há links de demonstração apontando para '/', card genérico 'Em Breve', email sem mailto, imagem de perfil sem texto alternativo e currículo apontando para o PDF de novembro de 2023. O novo arquivo CV/Marcos_Mendes_CV.pdf existe e está não rastreado pelo Git; foi preservado. Não extrair idade nem atualizar anos de experiência por inferência a partir do texto antigo.

## Proposta visual e técnica

Direção: fundo grafite no modo escuro e branco suave no claro, acento azul, tipografia legível, espaços amplos e capturas reais dos projetos. Abertura com nome, Desenvolvimento Full Stack, resumo conciso e ações Projetos, GitHub e Currículo. Três projetos visuais em destaque; filtros e páginas de detalhes; competências com evidências; trajetória, formação e contato. Cases backend com diagrama simples e documentação, sem imagens falsas de interfaces.

Proposta tecnológica: Next.js, React e TypeScript; Supabase Auth e PostgreSQL; funções de servidor para contato e eventos; hospedagem Vercel ou Netlify. Esta é uma proposta de arquitetura, sem implantação ou configuração de contas realizada.

Administração: login sem cadastro público; autorização por identificador de usuário administrador e políticas RLS; verificar autorização no servidor e no banco. Chaves privilegiadas apenas no servidor. Indicadores privados de visitas, cliques e downloads, agregação diária/semanal/mensal e exportação CSV/TXT.

Medição: coletar apenas tipo do evento, horário do servidor, caminho de origem sem parâmetros pessoais e categoria ampla de dispositivo/navegador. Validar eventos, limitar requisições e aplicar política de retenção. O contador deve representar início de entrega bem-sucedida do currículo, pois o servidor não comprova que o visitante salvou o arquivo. Não bloquear o currículo se o registro analítico falhar.

Contato: validação cliente/servidor, honeypot e limite de frequência; mensagens de sucesso somente após aceitação pelo serviço de envio. Email e LinkedIn confirmados no site atual; WhatsApp pessoal deve vir do currículo ou de confirmação, nunca dos telefones dos restaurantes.

## Etapas após definição da proposta

1. Concluir a inspeção dos candidatos, extrair o currículo e consolidar conteúdo, links, tecnologias e status.
2. Implementar interface responsiva, tema, filtros e detalhes acessíveis; testar navegação, teclado e links.
3. Configurar banco, autenticação, eventos, download e painel; testar acesso anônimo, não administrador e administrador.
4. Implementar contato e proteção contra abuso; testar validação e falhas reais.
5. Adicionar SEO, imagem social, sitemap, robots e 404; medir desempenho e conferir mobile/desktop.
6. Entregar README, configuração de ambiente, migrações e instruções de publicação.

O briefing solicita aprovação da seleção e estrutura antes da implementação completa. A seleção acima permanece preliminar pelas lacunas explicitadas; nenhum serviço externo foi alterado ou publicado.
