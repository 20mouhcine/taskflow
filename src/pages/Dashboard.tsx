import { useState, useCallback } from 'react'; 
import api from '../api/axios'; 
import HeaderBS from '../components/HeaderBS';
import Sidebar from '../components/Sidebar'; 
import MainContent from '../components/MainContent'; 
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css'; 
<<<<<<< HEAD
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../features/auth/authSlice';
import useProjects from '../hooks/useProjects';
=======
import HeaderMUI from '../components/HeaderMUI';
>>>>>>> eacec934a4a37ab072573a116ec6c83fd8f5e607
  
interface Project { id: string; name: string; color: string; } 
interface Column { id: string; title: string; tasks: string[]; } 
  
export default function Dashboard() { 
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const { projects, columns, loading, error, addProject, renameProject, deleteProject } 
    = useProjects(); 
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [showForm, setShowForm] = useState(false);

  // Wrapper pour adapter la signature de renameProject
  const handleRename = useCallback((id: string, newName: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      renameProject({ ...project, name: newName });
    }
  }, [projects, renameProject]);

  // Wrapper pour deleteProject
  const handleDelete = useCallback((id: string) => {
    deleteProject(id);
  }, [deleteProject]);

   
  // GET — charger les données au montage 
  // useEffect(() => { 
  //   async function fetchData() { 
  //     try { 
  //       const [projRes, colRes] = await Promise.all([ 
  //         api.get('/projects'), 
  //         api.get('/columns'), 
  //       ]); 
  //       setProjects(projRes.data); 
  //       setColumns(colRes.data); 
  //     } catch (e) { console.error(e); } 
  //     finally { setLoading(false); } 
  //   } 
  //   fetchData(); 
  // }, []); 
  
  // // POST — ajouter un projet 
  // async function addProject(name: string, color: string) { 
  //   const { data } = await api.post('/projects', { name, color }); 
  //   setProjects(prev => [...prev, data]); 
  // } 
  
  // // PUT — renommer un projet 
  // // À VOUS D'ÉCRIRE (voir specs ci-dessous) 
  // async function renameProject(id: string, newName: string) {
  //   const { data } = await api.put(`/projects/${id}`, { name: newName });
  //   setProjects(prev => prev.map(p => p.id === id ? data : p));
  // }
  
  // // DELETE — supprimer un projet 
  // // À VOUS D'ÉCRIRE (voir specs ci-dessous) 
  // async function deleteProject(id: string) {
  //   await api.delete(`/projects/${id}`);
  //   setProjects(prev => prev.filter(p => p.id !== id));
  // }

  
  if (loading) return <div className={styles.loading}>Chargement...</div>; 

  return ( 
    <div className={styles.layout}> 
      <HeaderMUI
        title="TaskFlow" 
        onMenuClick={() => setSidebarOpen(p => !p)} 
        userName={user?.name} 
        onLogout={() => dispatch(logout())} 
      /> 
      <div className={styles.body}> 
        <Sidebar 
          projects={projects} 
          isOpen={sidebarOpen} 
          onRename={handleRename}
          onDelete={handleDelete}
        /> 
        <div className={styles.content}> 
          <div className={styles.toolbar}> 
            {!showForm ? ( 
              <button className={styles.addBtn} 
                onClick={() => setShowForm(true)}> 
                + Nouveau projet 
              </button> 
            ) : ( 
              <ProjectForm 
                submitLabel="Créer" 
                onSubmit={(name, color) => { 
                  addProject(name, color); 
                  setShowForm(false); 
                }} 
                onCancel={() => setShowForm(false)} 
              /> 
            )} 
          </div> 
          <MainContent columns={columns} /> 
        </div> 
      </div> 
    </div> 
  ); 
} 