import type { ComponentResolver, SideEffectsInfo } from '../../types'
import { isSSR, kebabCase } from '../utils'

const moduleType = isSSR ? 'lib' : 'es'

export interface VantResolverOptions {
  /**
   * import style css or less along with components
   *
   * @default true
   */
  importStyle?: boolean | 'css' | 'less'
}

function getSideEffects(dirName: string, options: VantResolverOptions): SideEffectsInfo | undefined {
  const { importStyle = true } = options

  if (!importStyle || isSSR)
    return

  if (importStyle === 'less')
    return `vant/${moduleType}/${dirName}/style/less`

  if (importStyle === 'css')
    return `vant/${moduleType}/${dirName}/style/index`

  return `vant/${moduleType}/${dirName}/style/index`
}

/**
 * Resolver for Vant
 *
 * @link https://github.com/youzan/vant
 */
export function VantResolver(options: VantResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Vant')) {
        const partialName = name.slice(4)
        return {
          name: partialName,
          from: `vant/${moduleType}`,
          sideEffects: getSideEffects(kebabCase(partialName), options),
        }
      }
    },
  }
}
