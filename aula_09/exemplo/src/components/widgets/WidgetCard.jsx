export default function WidgetCard({ title, badge, loading, error, children, className = '' }) {
  return (
    <div className={`widget-card ${className}`}>
      <div className="widget-header">
        <span className="widget-title">{title}</span>
        {badge && <span className="widget-badge">{badge}</span>}
      </div>

      {loading && (
        <div className="widget-loading">
          <div className="spinner" />
          <span>Carregando...</span>
        </div>
      )}

      {!loading && error && (
        <div className="widget-error">
          <span>Erro ao carregar dados</span>
          <small>{error}</small>
        </div>
      )}

      {!loading && !error && children}
    </div>
  );
}
