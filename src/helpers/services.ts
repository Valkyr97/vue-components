import { IService } from '../types/Service'

export const services: IService[] = [
  {
    name: 'store',
    label: 'Tienda',
    icon: 'las la-store-alt',
    links: [
      { label: 'Productos', value: 'productsList' },
      { label: 'Órdenes', value: 'storeOrders' },
      { label: 'Envíos', value: 'storeShipments' },
      { label: 'Categorías', value: 'storeCategories' },
      { label: 'Personal', value: 'staffList' },
      { label: 'Formulario', value: 'storeForm' },
      { value: 'productsForm' },
      { value: 'categoryForm' },
    ],
  },
  {
    name: 'parcelService',
    label: 'Servicio de Envíos',
    icon: 'las la-shipping-fast',
    links: [{ label: 'Formulario', value: 'parcelServiceForm' }],
  },
  {
    name: 'remesaService',
    label: 'Servicio de Remesas',
    icon: 'las la-money-check-alt',
    links: [],
  },
  {
    name: 'configurations',
    label: 'Configuraciones',
    icon: 'las la-sliders-h',
    links: [
      { label: 'Información de Contacto', value: 'contactConfig' },
      { label: 'Administradores', value: 'adminsConfig' },
    ],
  },
]
