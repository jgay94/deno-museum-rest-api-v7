# deno museum rest api v7
 A RESTful museum service made with Deno & the Oak middleware framework.

## User Stories
- [ ] As a User, I am able to register and log in.
- [ ] As a User, I am able to create a museum with a name, description, and location.
- [ ] As a User, I can view a list of museums.
- [ ] As a User, I can view a museum's details.
- [ ] As a User, I can edit a museum's details.
- [ ] As a User, I can remove a museum.

## Project Structure
```bash
├── src/
│   ├── museums/
│   │   ├── mod.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── repository.ts
│   │   └── typings.d.ts
│   ├── framework/
│   │   ├── mod.ts
│   │   ├── server.ts
│   │   ├── router.ts
│   │   └── database.ts
│   └── main.ts
├── __tests__/
├── deno.json
├── deps.ts
├── dev_deps.ts
├── import_map.json
├── lock.json
├── LICENSE
├── README.md
└── .gitignore
```