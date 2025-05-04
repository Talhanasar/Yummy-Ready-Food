import { CheckCircle, Clock } from "lucide-react"

function StatusBadge({ status }) {
    const colors = {
        completed: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800'
    }

    const icons = {
        completed: CheckCircle,
        pending: Clock
    }

    const Icon = icons[status]

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
            <Icon className="mr-1 h-4 w-4" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}

export default StatusBadge