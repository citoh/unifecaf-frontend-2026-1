import { useSelector, useDispatch } from 'react-redux';
import { setCurso } from '../store/slices/filterSlice';

export default function GlobalFilter() {
  const dispatch = useDispatch();
  const curso = useSelector((state) => state.filter.curso);
  const cursos = useSelector((state) =>
    (state.resumo.data?.cursos ?? []).map((c) => c.nome).sort()
  );

  return (
    <div className="global-filter">
      <label htmlFor="filtro-curso">Filtrar por Curso</label>
      <select
        id="filtro-curso"
        value={curso}
        onChange={(e) => dispatch(setCurso(e.target.value))}
      >
        <option value="">Todos os cursos</option>
        {cursos.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
