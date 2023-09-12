<DialogBody className="shadow-none">
  <Tabs value="Html" orientation="vertical">
    <TabsHeader className="w-32">
      {data.map(({ label, value }) => {
        if (value !== "Html") {
          if (value == "Flujo") {
            if (areasdata.p_flujo) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Documentos") {
            if (
              areasdata.p_rol === "Admin" ||
              RolUser.rol_user === "Editor" ||
              RolUser.rol_user === "Revisor"
            ) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Editor de Texto") {
            if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor") {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Guias") {
            if (
              areasdata.p_rol === "Admin" ||
              RolUser.rol_user === "Editor" ||
              RolUser.rol_user === "Revisor"
            ) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Definir Flujo") {
            if (areasdata.p_rol === "Admin" && !areasdata.p_flujo) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value === "Subir Nivel") {
            if (areasdata.p_rol === "Admin" && users2.length === 1)
              if (users2[0].r_estado) {
                return (
                  <Tab key={label} value={value}>
                    {label}
                  </Tab>
                );
              }
          } else if (value == "Flujo") {
            if (
              areasdata.p_rol === "Admin" ||
              RolUser.rol_user === "Editor" ||
              RolUser.rol_user === "Revisor"
            ) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Revisiones") {
            if (areasdata.p_flujo) {
              if (
                areasdata.p_rol === "Admin" ||
                RolUser.rol_user === "Editor" ||
                RolUser.rol_user === "Revisor"
              ) {
                return (
                  <Tab key={label} value={value}>
                    {label}
                  </Tab>
                );
              }
            }
          } else if (value == "Configuracion") {
            if (areasdata.p_rol === "Admin" && proyectoEdit) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Alcance") {
            if (
              areasdata.p_reforma &&
              (areasdata.p_rol === "Admin" ||
                RolUser.rol_user === "Editor" ||
                RolUser.rol_user === "Revisor")
            ) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Historial de borradores") {
            if (
              areasdata.p_rol === "Admin" ||
              RolUser.rol_user === "Editor" ||
              RolUser.rol_user === "Revisor"
            ) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Historial") {
            if (
              areasdata.p_rol === "Admin" ||
              RolUser.rol_user === "Editor" ||
              RolUser.rol_user === "Revisor"
            ) {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else if (value == "Participantes") {
            if (areasdata.p_rol === "Admin") {
              return (
                <Tab key={label} value={value}>
                  {label}
                </Tab>
              );
            }
          } else {
            return (
              <Tab key={label} value={value}>
                {label}
              </Tab>
            );
          }
        }
      })}
    </TabsHeader>
    <TabsBody>
      {data.map(({ value }) => {
        if (value === "Documentos") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <DocumentosAreas
                id={idproyecto}
                rol={areasdata.p_rol}
                editproyecto={
                  users2.length >= 2 || RolUser.rol_user === "Revisor"
                    ? false
                    : true
                }
              />
            </TabPanel>
          );
        } else if (value === "Alcance") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              {<AlcanceProyecto id={idproyecto} />}
            </TabPanel>
          );
        } else if (value === "Editor de Texto") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              Aqui debe de abrir una pequena interfaz que sirve como
              intermediario para abrir el editor de texto en otra pestana
              <Button onClick={() => setOpenD(true)}>Abrir Editor</Button>
            </TabPanel>
          );
        } else if (value === "Guias") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <GuiasProyecto
                id={idproyecto}
                rol={areasdata.p_rol}
                editproyecto={
                  users2.length >= 2 ||
                  RolUser.rol_user === "Revisor" ||
                  RolUser.rol_user === "Editor"
                    ? false
                    : true
                }
              />
            </TabPanel>
          );
        } else if (value === "Revisiones") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <NivelesProyecto id={idproyecto} />
            </TabPanel>
          );
        } else if (value === "Definir Flujo") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <CrearFlujoProyecto
                idproyecto={idproyecto}
                idarea={idarea}
                Recargar={Recargar}
              />
            </TabPanel>
          );
        } else if (value === "Configuracion") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <ConfigurarProyecto
                eliminarFlujo={areasdata.p_flujo ? true : false}
                id_proyecto={idproyecto}
              />
            </TabPanel>
          );
        } else if (value === "Subir Nivel") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <SubirNivel id_proyect={idproyecto} />
            </TabPanel>
          );
        } else if (value === "Flujo") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <VerFlujo_Proyecto idproyecto={idproyecto} />
            </TabPanel>
          );
        } else if (value === "Historial de borradores") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <BorradoresProyecto id={idproyecto} />
            </TabPanel>
          );
        } else if (value === "Historial") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <Historial id={idproyecto} />
            </TabPanel>
          );
        } else if (value === "Participantes") {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <Participantes
                idproyecto={idproyecto}
                idarea={idarea}
                agregarRevisores={true}
              />
            </TabPanel>
          );
        } else {
          return (
            <TabPanel key={value} value={value} className="py-0">
              <Lottie
                animationData={anim_settings}
                className="w-80 md:w-2/5 mx-auto"
              />
            </TabPanel>
          );
        }
      })}
    </TabsBody>
  </Tabs>
</DialogBody>;
